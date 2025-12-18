import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, TouchableOpacity, Animated, Alert, Image} from "react-native";
import { useState, useEffect, useRef } from "react";
import recipes from "../../../recipes/index";
import { Vibration } from "react-native";
import { Audio } from "expo-av"; 

export default function Instructions() {
  // Get category and recipe ID from URL
  const { category, id } = useLocalSearchParams<{ category: string; id: string }>();
  const router = useRouter();

  // Handle invalid recipe ID or category
  if (!category || !id || !recipes[category] || !recipes[category][id]) {
    return (
      <View className="flex-1 justify-center items-center p-4 bg-white">
        <Text className="text-red-500 text-lg">Error: Recipe not found</Text>
      </View>
    );
  }

  const recipe = recipes[category][id];
  const [stepIndex, setStepIndex] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [showSummary, setShowSummary] = useState(false);

  const currentStep = recipe.instructions[stepIndex] || null;

  // Timer alert function
  const playSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("../../../../assets/timer_done.mp3") // Make sure you have a sound file in the correct directory
      );
      await sound.playAsync();
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };
  
  // Timer states
  const [timeLeft, setTimeLeft] = useState<number | null>(currentStep?.time || null);
  const [originalTime, setOriginalTime] = useState<number | null>(currentStep?.time || null);
  const [timerRunning, setTimerRunning] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);

  // Fade in effects when changing steps
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    if (timer.current) clearInterval(timer.current);

    if (currentStep) {
      setTimeLeft(currentStep.time || null);
      setOriginalTime(currentStep.time || null);
    }

    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [stepIndex]);

  // Timer functions
  const startTimer = () => {
    if (timeLeft === null || timeLeft <= 0 || timerRunning) return;

    setTimerRunning(true);
    timer.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev !== null && prev > 0) {
          return prev - 1;
        } else {
          clearInterval(timer.current!);
          setTimerRunning(false);
          // Trigger vibration and sound alert when timer reaches zero
          Vibration.vibrate();
          playSound();
          Alert.alert("Timer Done", "Time's up for this step!");
          return null;
        }
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (timer.current) clearInterval(timer.current);
    setTimerRunning(false);
  };

  const resetTimer = () => {
    if (timer.current) clearInterval(timer.current);
    setTimerRunning(false);
    setTimeLeft(originalTime);
  };

const [motivatorShown, setMotivatorShown] = useState(false);

// Step navigation
const nextStep = () => {
  if (stepIndex + 1 === recipe.instructions.length) {
    setShowSummary(true);
  } else {
    fadeAnim.setValue(0);
    const newStepIndex = stepIndex + 1;
    setStepIndex(newStepIndex);

    // Check if user reached halfway point (rounded down)
    const halfwayPoint = Math.floor(recipe.instructions.length / 2);
    if (newStepIndex === halfwayPoint && !motivatorShown) {
      Alert.alert("Great Job!", "You're halfway through! Keep going!");
      setMotivatorShown(true);
    }
  }
};

  const prevStep = () => {
    if (stepIndex > 0) {
      fadeAnim.setValue(0);
      setStepIndex(stepIndex - 1);
    }
  };

  const totalTime = recipe.totalTime || recipe.instructions.reduce((sum, step) => sum + (step.time || 0), 0);

  // Display summary at the end
  if (showSummary) {
    return (
      <View className="flex-1 p-6 bg-white justify-center items-center">
        <Text className="text-4xl font-extrabold text-green-600 mb-6 text-center">
          Recipe Completed! 
        </Text>
  
        <Text className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Ingredients Used:
        </Text>
        <View className="w-full px-4">
          {recipe.ingredients?.map((ingredient, index) => (
            <Text key={index} className="text-xl text-gray-600 mb-1 text-center">
              • {ingredient}
            </Text>
          ))}
        </View>
  
        <Text className="text-2xl font-semibold text-gray-800 mt-6 mb-2 text-center">
          Estimated Total Time:
        </Text>
        <Text className="text-3xl font-bold text-blue-600">
          {Math.floor(totalTime / 60)} min {totalTime % 60} sec
        </Text>

        <TouchableOpacity
          onPress={() => router.push(`/recipes/review?category=${category}&id=${id}`)}
          className="px-8 py-4 mt-6 bg-purple-500 rounded-2xl shadow-lg">
          <Text className="text-white text-2xl font-bold">Leave a Review</Text>
        </TouchableOpacity>
        
  
        <TouchableOpacity onPress={() => router.push("/")} className="items-center mt-4">
          <Image source={require("../../../../assets/home.png")} style={{ width: 50, height: 50 }} />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 p-5 bg-gray-50">
      {/* Back Button at the Top */}
      <TouchableOpacity
        onPress={() => router.back()} 
        className="absolute top-10 left-4 z-10 p-4"
      >
        <Text className="text-blue-500 font-semibold text-lg">Back</Text>
      </TouchableOpacity>

      {/* Instructions Section */}
      <View className="flex-grow justify-center items-center">
        <Text className="text-3xl font-extrabold text-gray-800 mb-4 text-center">
          {recipe.name} Instructions
        </Text>
        <Text className="text-lg text-gray-500 mb-6 text-center">
          Step {stepIndex + 1} of {recipe.instructions.length}
        </Text>

        <Animated.View
          style={{ opacity: fadeAnim }}
          className="w-full p-6 bg-white border border-gray-300 rounded-2xl shadow-lg"
        >
          <Text className="text-lg text-center text-gray-800">{currentStep?.text}</Text>
        </Animated.View>
      </View>

      {/* Timer & Buttons - Positioned Higher than Bottom */}
      <View className="mb-20">
        {timeLeft !== null && (
          <View className="items-center mb-6">
            <Text className="text-2xl font-bold text-red-500">
              Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
            </Text>
            <View className="flex-row mt-2 gap-4">
            <TouchableOpacity onPress={startTimer} disabled={timerRunning} className="px-5 py-4 bg-blue-500 rounded-xl">
              <Text className="text-white font-semibold text-lg">Start Timer</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={stopTimer} className="px-5 py-4 bg-gray-500 rounded-xl">
              <Text className="text-white font-semibold text-lg">Stop Timer</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={resetTimer} className="px-5 py-4 bg-yellow-500 rounded-xl">
  <Text className="text-white font-semibold text-lg">Reset Timer</Text>
            </TouchableOpacity>
          </View>
        </View>
        )}

        {/* Navigation Buttons */}
        <View className="flex-row mt-12 gap-6 justify-center">
          {stepIndex > 0 && (
          <TouchableOpacity onPress={prevStep} className="px-7 py-5 bg-red-400 rounded-xl">
            <Text className="text-white font-semibold text-lg">Previous</Text>
          </TouchableOpacity>
          )}
          <TouchableOpacity onPress={nextStep} className="px-7 py-5 bg-green-500 rounded-xl">
            <Text className="text-white font-semibold text-lg">
            {stepIndex === recipe.instructions.length - 1 ? "Finish" : "Next"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}