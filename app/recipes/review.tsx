import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, TextInput, TouchableOpacity, Alert, Keyboard, TouchableWithoutFeedback, ScrollView, Image } from "react-native";
import { useState } from "react";

export default function Review() {
  const { category, id } = useLocalSearchParams<{ category: string; id: string }>();
  const router = useRouter();

  const [rating, setRating] = useState<number | null>(null);
  const [reviewText, setReviewText] = useState("");

  // Handle review submission
  const submitReview = () => {
    if (!rating) {
      Alert.alert("Error", "Please select a rating before submitting.");
      return;
    }

    console.log("Review Submitted:", { category, id, rating, reviewText });

    //Show confirmation message
    Alert.alert("Thank You!", "Your review has been submitted.");
    router.push("/"); // Redirect back to home or recipe list
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

      {/* scrollable content*/}
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center", padding: 20 }} className="bg-white">
        <View className="w-full max-w-md">  
          <Text className="text-3xl font-bold text-center mb-6">Leave a Review</Text>

          {/* Rating Section */}
          <Text className="text-lg mb-2 text-center">Rate this recipe:</Text>
          <View className="flex-row justify-center mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => setRating(star)}>
                <Text className={`text-4xl ${star <= (rating || 0) ? "text-yellow-500" : "text-gray-300"}`}>
                  ★
                </Text>
              </TouchableOpacity>
            ))}
          </View>

           {/* Review Input Section */}
          <Text className="text-lg mb-2 text-center">Write a Review:</Text>
          <TextInput
            className="border p-4 rounded-lg mb-4 w-full h-40 text-lg"
            placeholder="Share your thoughts..."
            value={reviewText}
            onChangeText={setReviewText}
            multiline
            textAlignVertical="top"
          />
          
          {/* Submit Button */}
          <TouchableOpacity onPress={submitReview} className="px-6 py-3 bg-green-500 rounded-xl">
            <Text className="text-white text-lg text-center">Submit Review</Text>
          </TouchableOpacity>

           {/* Home Button */}
          <TouchableOpacity onPress={() => router.push("/")} className="items-center mt-4">
            <Image source={require("../../assets/home.png")} style={{ width: 50, height: 50 }} />
          </TouchableOpacity>

        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}