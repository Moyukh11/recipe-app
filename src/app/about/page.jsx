import React from "react";

export default function AboutPage() {
  return (
    <main className="min-h-screen px-4 sm:px-6 lg:px-8 py-16">
      <div className="mx-auto w-full max-w-4xl rounded-3xl border border-gray-200 bg-white/90 p-6 sm:p-10 shadow-lg dark:border-white/10 dark:bg-slate-950/90">
        <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">
          About Food App
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-700 dark:text-slate-300">
          Welcome to the Food App! This app helps you search for recipes, save favourites, and quickly browse delicious meals.
        </p>
        <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-400">
          Use the navigation above to explore the home page, your favourite recipes, and learn more about how this app works.
        </p>
      </div>
    </main>
  );
}
