import { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import recipes from "../recipes/index";

// Define the Recipe type
type Recipe = {
    id: string;
    name: string;
    totalTime: number;
    ingredients: string[];
    dietary: string[];
    instructions: { text: string; time: number }[];
    category: string;
};

// Search function
export default function Search() {
    const router = useRouter();
    const [query, setQuery] = useState("");
    const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
    const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    // List of dietary filters
    const filters = ["No Filter", "Vegan", "Dairy-Free", "Gluten-Free", "Vegetarian"];

    // Filters recipes when the selected filter changes
    useEffect(() => {
        handleSearch(query);
    }, [selectedFilter, query]);

    // To check if a recipe matches the selected dietary filter
    const applyFilters = (recipe: Recipe) => {
        if (!selectedFilter || selectedFilter === "No Filter") return true;
        return recipe.dietary.includes(selectedFilter);
    };

    // Search and filter recipes based on user input
    const handleSearch = (text: string) => {
        setQuery(text);
        const results: Recipe[] = [];

        Object.keys(recipes).forEach((category) => {
            Object.keys(recipes[category]).forEach((id) => {
                const recipe = recipes[category][id] as Recipe;
                if (
                    recipe.name.toLowerCase().includes(text.toLowerCase()) &&
                    applyFilters(recipe)
                ) {
                    results.push({ ...recipe, id, category });
                }
            });
        });

        setFilteredRecipes(results);
    };

    return (
        <View className="flex-1 p-4 bg-white">
            {/* Title */}
            <Text className="text-4xl font-bold text-gray-800 mt-12 mb-2">Search Recipes</Text>

            {/* Search and Filter Container */}
            <View className="mt-8 flex-row items-center space-x-3 relative">
                <TextInput
                    className="flex-1 p-3 border border-gray-300 rounded-lg"
                    placeholder="Search for recipes..."
                    value={query}
                    onChangeText={setQuery}
                />

                {/* Filter Button */}
                <TouchableOpacity
                    className="px-4 py-3 bg-blue-500 rounded-lg flex-row items-center justify-center"
                    onPress={() => setDropdownVisible(!isDropdownVisible)}
                >
                    <Text className="text-white font-semibold mr-2">{selectedFilter || "Filter"}</Text>
                    <Text className="text-white">🔽</Text>
                </TouchableOpacity>

                {/* Dropdown Menu with Visual Enhancements */}
                {isDropdownVisible && (
                    <View className="absolute right-0 top-14 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                        {filters.map((filter) => (
                            <TouchableOpacity
                                key={filter}
                                className={`p-3 border-b border-gray-200 ${
                                    selectedFilter === filter ? "bg-blue-100" : "bg-white"
                                }`}
                                onPress={() => {
                                    setSelectedFilter(filter === "No Filter" ? null : filter);
                                    setDropdownVisible(false);
                                }}
                            >
                                <Text className={`text-gray-800 ${selectedFilter === filter ? "font-bold" : ""}`}>
                                    {filter} {selectedFilter === filter ? "✔" : ""}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </View>

            {/* Active Filters Display */}
            {selectedFilter && selectedFilter !== "No Filter" && (
                <View className="mt-4 p-2 bg-gray-100 rounded-lg flex-row items-center">
                    <Text className="text-gray-700">Active Filter: {selectedFilter}</Text>
                    <TouchableOpacity onPress={() => setSelectedFilter(null)} className="ml-2">
                        <Text className="text-red-500 font-bold">✖</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Recipe List */}
            <FlatList
                data={filteredRecipes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => router.push(`/recipes/${item.category}/${item.id}`)}
                        className="p-4 mt-4 border border-gray-200 rounded-lg"
                    >
                        <Text className="text-lg font-semibold text-gray-800">{item.name}</Text>
                        <Text className="text-gray-500">Category: {item.category}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}