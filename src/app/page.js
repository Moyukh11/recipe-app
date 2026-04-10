"use client";
import React, { useState } from "react";
import { AuroraBackground } from "../components/ui/aurora-background";
import { PlaceholdersAndVanishInput } from "../components/ui/placeholders-and-vanish-input";
import Link from "next/link";

export default function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecipes = async (query) => {
    if (!query) return;
    setLoading(true);
    try {
      // Using TheMealDB public API
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      const data = await res.json();
      setRecipes(data.meals || []); // meals = null if no results
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    // Removed live fetch; now only fetches on submit
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const query = e.target[0].value.trim();
    if (query) fetchRecipes(query);
  };

  return (
    <AuroraBackground>
      <div className="min-h-screen flex flex-col items-center justify-start px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="mb-10 sm:mb-16 text-3xl sm:text-5xl text-center dark:text-white text-black font-semibold max-w-4xl">
          Search for your favourite recipes
        </h2>

        {/* 🔍 Search Input */}
        <PlaceholdersAndVanishInput
          placeholders={[
            "Biryani",
            "Mutton Curry",
            "Chilli Chicken",
            "Fried Rice",
            "Pasta",
          ]}
          onChange={handleChange}
          onSubmit={onSubmit}
        />

        {/* 🍽 Recipe Cards */}
        <div className="mt-14 w-full max-w-7xl">
          {loading ? (
            <p className="text-center text-white text-lg">Loading recipes...</p>
          ) : recipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recipes.slice(0, 12).map((recipe) => (
                <div
                  key={recipe.idMeal}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold mb-2 dark:text-white">
                      {recipe.strMeal}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 flex-grow">
                      {recipe.strArea} | {recipe.strCategory}
                    </p>
                    <Link href={`/recipe/${recipe.idMeal}`} className="mt-4 block">
                      <span className="block w-full rounded-lg bg-blue-600 text-white text-center py-2 hover:bg-blue-700 transition">
                        Recipe Details
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400 mt-10">
              🔍 Try searching for something delicious!
            </p>
          )}
        </div>
      </div>
    </AuroraBackground>
  );
}
