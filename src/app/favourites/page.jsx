"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const FAVORITES_KEY = "favoriteRecipes";

const loadFavorites = () => {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(FAVORITES_KEY) || "[]");
  } catch {
    return [];
  }
};

export default function FavouritePage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(loadFavorites());
  }, []);

  const handleRemove = (idMeal) => {
    const nextFavorites = favorites.filter((recipe) => recipe.idMeal !== idMeal);
    setFavorites(nextFavorites);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(nextFavorites));
    }
  };

  return (
    <main className="min-h-screen px-4 sm:px-6 lg:px-8 py-16">
      <div className="mx-auto w-full max-w-6xl">
        {favorites.length === 0 ? (
          <div className="flex h-[60vh] items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white/80 text-center text-xl text-slate-600 shadow-lg dark:border-slate-700 dark:bg-slate-950/80 dark:text-slate-300">
            Your favourites list is empty.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.map((recipe) => (
              <div
                key={recipe.idMeal}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-950"
              >
                <Link href={`/recipe/${recipe.idMeal}`} className="block">
                  <img
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    className="h-56 w-full object-cover transition duration-300 group-hover:scale-105 sm:h-64"
                  />
                  <div className="p-5">
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                      {recipe.strMeal}
                    </h2>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                      {recipe.strCategory} · {recipe.strArea}
                    </p>
                  </div>
                </Link>
                <button
                  type="button"
                  onClick={() => handleRemove(recipe.idMeal)}
                  className="absolute right-4 top-4 rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
