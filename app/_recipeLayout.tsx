import { Stack } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';


export default function RecipeLayout() {
  const { category } = useLocalSearchParams(); 

  return (
    <Stack>
      {/* Recipe category page */}
      <Stack.Screen
        name="recipes/[category]"
        options={{
          title: category ? `${category} Recipes` : "Recipe Helper", 
          headerShown: true,
        }}
      />

      {/* Recipe detail page */}
      <Stack.Screen
        name="recipes/[category]/[id]"
        options={{
          title: "Recipe Details", 
          headerShown: true,
        }}
      />
    </Stack>
  );
}

