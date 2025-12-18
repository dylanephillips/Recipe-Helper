import { Stack } from "expo-router";
import './global.css';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="(tabs)"
        options={{ headerShown: false }} // Hide header for this screen
      />
       <Stack.Screen
        name="recipes/[category]/[id]"
        options={{ headerShown: false }} // Hide header for this screen
      />
      <Stack.Screen
        name="recipes/[category]"
        options={{ headerShown: false }} // Hide header for this screen
      />
      <Stack.Screen
        name="recipes/[category]/[id]/instructions"
        options={{ headerShown: false }} // Hide header for this screen
      />
       <Stack.Screen
        name="recipes/review"
        options={{ headerShown: false }} // Hide header for this screen
      />
    </Stack>
  );
}