"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";

const FAVORITES_KEY = "favoriteRecipes";

const loadFavorites = () => {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(FAVORITES_KEY) || "[]");
  } catch {
    return [];
  }
};

const saveFavorites = (favorites) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

export default function RecipeDetailPage() {
  const { idMeal } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
        const data = await res.json();
        if (data.meals && data.meals[0]) {
          setRecipe(data.meals[0]);
        } else {
          setError("Recipe not found");
        }
      } catch (err) {
        setError("Error fetching recipe");
      } finally {
        setLoading(false);
      }
    };

    if (idMeal) fetchRecipe();
  }, [idMeal]);

  useEffect(() => {
    if (!recipe) return;
    const favorites = loadFavorites();
    setIsFavorite(favorites.some((item) => item.idMeal === recipe.idMeal));
  }, [recipe]);

  const handleAddToFavourites = () => {
    if (!recipe) return;
    const favorites = loadFavorites();
    if (!favorites.some((item) => item.idMeal === recipe.idMeal)) {
      const nextFavorites = [
        ...favorites,
        {
          idMeal: recipe.idMeal,
          strMeal: recipe.strMeal,
          strMealThumb: recipe.strMealThumb,
          strCategory: recipe.strCategory,
          strArea: recipe.strArea,
        },
      ];
      saveFavorites(nextFavorites);
      setIsFavorite(true);
    }
  };

  if (loading) return <p className="text-center py-16">Loading recipe...</p>;
  if (error) return <p className="text-center py-16 text-red-500">{error}</p>;
  if (!recipe) return <p className="text-center py-16">No recipe found</p>;

  // Parse ingredients
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${measure} ${ingredient}`);
    }
  }

  // Parse instructions
  const instructions = recipe.strInstructions.split('\r\n').filter(step => step.trim());

  return (
    <main className="min-h-screen px-4 sm:px-6 lg:px-8 py-16">
      <div className="mx-auto w-full max-w-4xl rounded-3xl border border-gray-200 bg-white/90 p-6 sm:p-10 shadow-lg dark:border-white/10 dark:bg-slate-950/90">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="w-full rounded-2xl shadow-lg object-cover"
            />
          </div>
          <div>
            <h1 className="text-4xl font-semibold text-slate-900 dark:text-white mb-4">
              {recipe.strMeal}
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-2">
              <strong>Category:</strong> {recipe.strCategory}
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
              <strong>Area:</strong> {recipe.strArea}
            </p>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
              Ingredients
            </h2>
            <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 mb-6">
              {ingredients.map((ing, idx) => (
                <li key={idx}>{ing}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
            Instructions
          </h2>
          <ol className="list-decimal list-inside text-slate-700 dark:text-slate-300 space-y-2">
            {instructions.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={handleAddToFavourites}
            disabled={isFavorite}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${isFavorite ? "bg-gray-300 text-slate-700 cursor-not-allowed" : "bg-amber-500 text-slate-900 hover:bg-amber-400"}`}>
            {isFavorite ? "Added to Favourites" : "Add To Favourites"}
          </button>
        </div>
        {recipe.strYoutube && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
              Video Tutorial
            </h2>
            <a
              href={recipe.strYoutube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Watch on YouTube
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
