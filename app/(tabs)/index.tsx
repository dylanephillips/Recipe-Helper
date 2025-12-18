import { useEffect } from "react";
import { useRouter } from "expo-router";
import { Text, View, TouchableOpacity, Image, Alert } from "react-native";
import { SafeAreaView, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


// Home screen displaying recipe categories
export default function Index() {
  const router = useRouter();

  // List of recipe categories with Images
  const categories = [
    { title: "Breakfast", image: require("../../assets/breakfast.jpg") },
    { title: "Lunch", image: require("../../assets/lunch.jpg") },
    { title: "Dinner", image: require("../../assets/dinner.jpg") },
  ];

  const showTutorial = async () => {
    Alert.alert(
      "Welcome to Recipe Helper! 🍽️",
      "🔍 Click the magnifying glass in the bottom left to search recipes.\n\n📂 Click a category on the home page to explore.\n\n⏳ Each recipe has built-in timers and step-by-step instructions.\n\n⭐ Rate and review when done!",
      [{ text: "Got it!", onPress: () => AsyncStorage.setItem("hasSeenTutorial", "true") }]
    );
  };

  useEffect(() => {
    const checkTutorial = async () => {
      const hasSeenTutorial = await AsyncStorage.getItem("hasSeenTutorial");
      if (!hasSeenTutorial) {
        showTutorial();
      }
    };

    checkTutorial();
  }, []);

  const resetTutorial = async () => {
    await AsyncStorage.removeItem("hasSeenTutorial"); // Reset flag
    showTutorial(); // Show tutorial again
  };


  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        
        {/* Header */}
        <Text className="text-3xl font-bold text-center mt-1 mb-12">Recipe Helper</Text>

        {/* Image Categories */}
        <View className="gap-4 px-4">
          {categories.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => router.push(`/recipes/${item.title.toLowerCase()}`)}
              className="relative rounded-lg overflow-hidden"
            >
              <Image source={item.image} className="w-full h-48 rounded-lg" resizeMode="cover" />
              <View className="absolute inset-0 flex justify-center items-center bg-black/40">
                <Text className="text-white text-3xl font-bold">{item.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        {/* Show Tutorial Again Button */}
        <View className="mt-6 px-4 flex items-center">
          <TouchableOpacity onPress={resetTutorial} className="border border-blue-500 px-3 py-2 rounded-full">
            <Text className="text-blue-500 text-base font-semibold">Replay Tutorial</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}