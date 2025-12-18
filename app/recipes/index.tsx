//Store categorized recipes 
const recipes: Record<
  string,
  Record<
    string,
    { name: string; totalTime: number; ingredients: string[]; dietary: string[]; instructions: { text: string; time: number }[] }
  >
> = {
// Breakfast Recipes 
  breakfast: {
    pancakes: {
        name: "Pancakes",
        totalTime: 1200, 
        ingredients: ["1 cup flour", "1 egg", "1 cup almond milk", "1 tsp sugar", "1 tsp baking powder"],
        dietary:["Dairy-free", "Vegetarian"], 
        instructions: [
            { text: "Mix flour, sugar, and baking powder in a bowl.", time: 0 },
            { text: "Whisk eggs and milk together.", time: 0 },
            { text: "Combine wet and dry ingredients, then stir until smooth.", time: 0 },
            { text: "Heat a pan over medium heat.", time: 0 },
            { text: "Pour batter into the pan and cook for **2 minutes**.", time: 120 },
            { text: "Flip the pancake and cook for **1 more minute**.", time: 60 },
            { text: "Serve with syrup and enjoy!", time: 0 },
      ],
    },
    omelette: {
        name: "Omelette",
        totalTime: 1500,
        ingredients: ['2 eggs', '1 tablespoon milk', '1/4 cup cheese'],
        dietary: ["Gluten-Free", "Vegetarian"], 
        instructions: [
            { text: "Crack eggs into a bowl and whisk with milk.", time: 0 },
            { text: "Heat a pan over medium heat.", time: 0 },
            { text: "Pour in the egg mixture and cook for **3 minutes**.", time: 180 },
            { text: "Add cheese and fillings, then fold the omelette.", time: 0 },
            { text: "Cook for **1 more minute**.", time: 60 },
            { text: "Serve warm and enjoy!", time: 0 },
        ],
    },
    smoothieBowl: {
        name: "Smoothie Bowl",
        totalTime: 420,
        ingredients: ['1 banana', '1/2 cup frozen berries'], 
        dietary: ["Vegan", "Dairy-Free", "Gluten-Free"],
        instructions: [
            {text: "Blend banana and frozen berries until smooth.", time: 0}, 
            {text: "Pour into a bowl and top with granola and fruit.", time: 0}, 
            {text: "Enjoy your refreshing smoothie bowl!", time: 0},
        ],
      },
  },
  //Lunch Recipes 
  lunch: {
    grilledCheese: {
        name: "Grilled Cheese",
        totalTime: 900,
        ingredients: ['2 slices of bread', '2 slices of cheese'],
        dietary: ["Vegetarian"],
        instructions: [
            { text: "Butter one side of each bread slice.", time: 0 },
            { text: "Place cheese between the slices, butter side out.", time: 0 },
            { text: "Cook on a pan over medium heat until golden brown on both sides.", time: 180 },
            { text: "Serve hot and enjoy!", time: 0 },
        ],
    },
    caesarSalad: {
        name: "Caesar Salad",
        totalTime: 600,
        ingredients: ['1 head of romaine lettuce', '1/4 cup croutons'],
        dietary: ["Gluten-Free", "Vegetarian"],
        instructions: [
            {text: "Chop romaine lettuce and place in a bowl.", time: 0}, 
            {text: "Add croutons and Caesar dressing.", time: 0}, 
            {text: "Toss everything together and top with Parmesan cheese.", time: 0},
            {text: "Enjoy your crisp Caesar salad!", time: 0},
        ],
    },
    burritoBowl: {
        name: "Burrito Bowl",
        totalTime: 2400, 
        ingredients: ['1 cup rice', '1/2 cup black beans', '1/4 cup salsa', '1/4 cup sour cream'],
        dietary: ["Vegetarian", "Gluten-Free"],
        instructions: [
            {text: "Cook rice and set aside.", time: 0},
            {text: "Sauté beans, veggies, and your choice of protein.", time: 0},
            {text: "Assemble the bowl with rice, beans, veggies, and toppings.", time: 0},
            {text: "Drizzle with salsa and enjoy!", time: 0}, 
        ],
    },
  }, 
  // Dinner Recipes 
  dinner: {
    spaghetti: {
        name: "Spaghetti",
        totalTime: 1800,
        ingredients: ['1 pound spaghetti', '1 jar marinara sauce'],
        dietary: ["Vegan"],
        instructions: [
            { text: "Boil water in a large pot.", time: 0 },
            { text: "Add spaghetti and cook for **8 minutes**.", time: 480 },
            { text: "Drain the pasta.", time: 0 },
            { text: "Heat marinara sauce in a pan.", time: 0 },
            { text: "Mix pasta with sauce and serve.", time: 0 },
        ],
    },
    salmonVeggies: {
      name: "Salmon & Veggies",
      totalTime: 3000,
      ingredients: ['1 salmon fillet', '1 cup broccoli florets'],
      dietary: ["Gluten-Free", "Dairy-Free", ],
      instructions: [
        { text: "Preheat oven to 400°F (200°C).", time: 900 },
        { text: "Place salmon and veggies on a baking sheet.", time: 0 },
        { text: "Drizzle with olive oil, salt, and pepper.", time: 0 },
        { text: "Bake for **20 minutes**.", time: 1200 },
        { text: "Serve and enjoy!", time: 0 },
      ],
    },
    stuffedPeppers: {
        name: "Stuffed Peppers",
        totalTime: 3000,
        ingredients: ['4 bell peppers', '1 cup rice', '1/2 pound ground beef', '1 can tomato sauce'],
        dietary: ["Gluten-Free"],
        instructions: [
            { text: "Cut tops off peppers and remove seeds.", time: 0 },
            { text: "Sauté onions, garlic, and ground meat or veggies.", time: 0 },
            { text: "Mix with cooked rice and stuff the peppers.", time: 0 },
            { text: "Bake at 375°F (190°C) for **25 minutes**.", time: 1500 },
            { text: "Serve warm and enjoy!", time: 0 },
        ],
    },
  },
};

export default recipes;