"use client";
import React, { useState } from "react";

export default function RecipeCard({ recipe }) {
  const [showDetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDetails = async () => {
    if (showDetails) {
      // hide details if already open
      setShowDetails(false);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipe.idMeal}`
      );
      const data = await res.json();
      setDetails(data.meals[0]);
      setShowDetails(true);
    } catch (err) {
      console.error("Error fetching details:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col hover:scale-105 transition">
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-2 dark:text-white">{recipe.strMeal}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-300 mb-3">
          {recipe.strArea} | {recipe.strCategory}
        </p>

        <button
          onClick={fetchDetails}
          className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {showDetails ? "Hide Details" : "Recipe Details"}
        </button>

        {loading && <p className="text-gray-500 mt-3">Loading...</p>}

        {showDetails && details && (
          <div className="mt-4 border-t border-gray-300 dark:border-gray-700 pt-3">
            <h4 className="text-md font-semibold dark:text-white mb-1">Instructions:</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
              {details.strInstructions}
            </p>

            <a
              href={details.strYoutube}
              target="_blank"
              className="text-blue-600 underline text-sm mb-2 block"
            >
              Watch on YouTube
            </a>

            <button
              onClick={() => alert(`${details.strMeal} added to favorites!`)}
              className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 w-full"
            >
              Add to Favorites
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
