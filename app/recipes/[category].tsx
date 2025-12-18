import { View, Text, TouchableOpacity, Image } from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'; 

export default function CategoryRecipes() {
  const router = useRouter(); 
  const { category } = useLocalSearchParams(); 

  // Recipe data for each category
  const recipes = {
    breakfast: [
      { id: 'pancakes', name: 'Pancakes', image: require('../../assets/pancakes.jpg') }, 
      { id: 'omelette', name: 'Omelette', image: require('../../assets/omelette.jpg') },
      { id: 'smoothieBowl', name: 'Smoothie Bowl', image: require('../../assets/smoothie.jpg') },
    ], 
    lunch: [
      { id: 'grilledCheese', name: 'Grilled Cheese', image: require('../../assets/grilled_cheese.jpg') },
      { id: 'caesarSalad', name: 'Caesar Salad', image: require('../../assets/caesar_salad.jpg') },
      { id: 'burritoBowl', name: 'Burrito Bowl', image: require('../../assets/burrito.jpg') },
    ], 
    dinner: [
      { id: 'spaghetti', name: 'Spaghetti', image: require('../../assets/spaghetti.jpg') },
      { id: 'salmonVeggies', name: 'Salmon & Veggies', image: require('../../assets/salmon.jpg') },
      { id: 'stuffedPeppers', name: 'Stuffed Peppers', image: require('../../assets/peppers.jpg') },
    ],
  };

  return (
    <View className="flex-1 bg-white p-4">
     {/* Back Button */}
     <TouchableOpacity
        onPress={() => router.back()}  // Navigate back to the previous page
        className="absolute top-10 left-4 z-10 p-4"  
      >
        <Text className="text-blue-500 font-semibold text-lg">Back</Text> 
      </TouchableOpacity>

      {/* Header */}
      <Text className="text-4xl font-bold text-center mb-6 mt-16">
        {typeof category === 'string' ? category.charAt(0).toUpperCase() + category.slice(1) : category} Recipes
      </Text>

      {/* Recipe Cards */}
      <View className="space-y-4">
        {recipes[category as keyof typeof recipes]?.map((recipe) => (
          <TouchableOpacity
            key={recipe.id}
            onPress={() => router.push(`/recipes/${category}/${recipe.id}`)}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <Image
              source={recipe.image}
              className="w-full h-40 rounded-lg"
              resizeMode="cover"
            />
            <Text className="text-3xl font-semibold text-center mt-4 mb-6">{recipe.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}