import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

// Define RecipeCategory and RecipeId types
type RecipeCategory = 'breakfast' | 'lunch' | 'dinner';
type RecipeId = 'pancakes' | 'omelette' | 'smoothieBowl' | 'grilledCheese' | 'burritoBowl' | 'caesarSalad' | 'spaghetti' | 'salmonVeggies' | 'stuffedPeppers';

export default function RecipeDetails() {
  const router = useRouter();
  const { category, id } = useLocalSearchParams<{ category: RecipeCategory; id: RecipeId }>();

  // Define recipe data for each category
  const recipes: Record<RecipeCategory, Partial<Record<RecipeId, { name: string; description: string; ingredients: string[]; image: any }>>> = {
    breakfast: {
      pancakes: {
        name: 'Pancakes',
        description: 'Fluffy and delicious pancakes...',
        ingredients: ['1 cup flour', '1 egg', '1 cup almond milk', '1 tsp sugar', '1 tsp baking powder'],
        image: require('../../../assets/pancakes.jpg'),
      },
      omelette: {
        name: 'Omelette',
        description: 'A classic omelette...',
        ingredients: ['2 eggs', '1 tablespoon milk', '1/4 cup cheese'],
        image: require('../../../assets/omelette.jpg'),
      },
      smoothieBowl: {
        name: 'Smoothie Bowl',
        description: 'A refreshing smoothie bowl...',
        ingredients: ['1 banana', '1/2 cup frozen berries'],
        image: require('../../../assets/smoothie.jpg'),
      },
    },
    lunch: {
      grilledCheese: {
        name: 'Grilled Cheese',
        description: 'A classic grilled cheese...',
        ingredients: ['2 slices of bread', '2 slices of cheese'],
        image: require('../../../assets/grilled_cheese.jpg'),
      },
      caesarSalad: {
        name: 'Caesar Salad',
        description: 'A crisp Caesar salad...',
        ingredients: ['1 head of romaine lettuce', '1/4 cup croutons'],
        image: require('../../../assets/caesar_salad.jpg'),
      },
      burritoBowl: {
        name: 'Burrito Bowl',
        description: 'A flavorful burrito bowl...',
        ingredients: ['1 cup rice', '1/2 cup black beans', '1/4 cup salsa', '1/4 cup sour cream'],
        image: require('../../../assets/burrito.jpg'),
      },
    },
    dinner: {
      spaghetti: {
        name: 'Spaghetti',
        description: 'Classic spaghetti...',
        ingredients: ['1 pound spaghetti', '1 jar marinara sauce'],
        image: require('../../../assets/spaghetti.jpg'),
      },
      salmonVeggies: {
        name: 'Salmon & Veggies',
        description: 'Baked salmon with roasted veggies...',
        ingredients: ['1 salmon fillet', '1 cup broccoli florets'],
        image: require('../../../assets/salmon.jpg'),
      },
      stuffedPeppers: {
        name: 'Stuffed Peppers',
        description: 'Peppers stuffed with a savory mixture...',
        ingredients: ['4 bell peppers', '1 cup rice', '1/2 pound ground beef', '1 can tomato sauce'],
        image: require('../../../assets/peppers.jpg'),
      },
    },
  };

  // Get the specific recipe based on category and id
  const recipe = category && id ? recipes[category][id] : null;

  if (!recipe) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-xl font-semibold">Recipe not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white p-6">
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-10 left-4 z-10 p-3"
      >
        <Text className="text-blue-500 font-semibold text-lg">Back</Text>
      </TouchableOpacity>

      {/* Recipe Title */}
      <Text className="text-3xl font-bold text-center mt-20">{recipe.name}</Text>

      {/* Recipe Image */}
      <Image
        source={recipe.image}
        className="w-full h-64 rounded-lg mt-6"
        resizeMode="cover"
      />

      {/* Description */}
      <Text className="text-lg text-gray-700 text-center mt-6 px-2">{recipe.description}</Text>

      {/* Ingredients */}
      <Text className="text-2xl font-semibold mt-8 mb-4">Ingredients:</Text>
      <View className="space-y-2">
        {recipe.ingredients.map((ingredient: string, index: number) => (
          <Text key={index} className="text-lg text-gray-800">{`• ${ingredient}`}</Text>
        ))}
      </View>

      {/* Buttons */}
      <View className="mt-10 space-y-4">
        {/* Start Cooking Button */}
        <TouchableOpacity
          onPress={() => router.push(`/recipes/${category}/${id}/instructions`)}
          className="bg-green-500 py-4 py-2 rounded-md mb-6"
        >
          <Text className="text-white text-center text-lg font-semibold">Start Cooking</Text>
        </TouchableOpacity>

        {/* Home Button */}
        <TouchableOpacity
          onPress={() => router.push('/')}
          className="bg-gray-200 py-3 rounded-lg"
        >
          <Text className="text-center text-lg font-semibold text-gray-800">Back to Home</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
