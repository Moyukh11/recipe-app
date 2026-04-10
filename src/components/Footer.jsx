"use client";
import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 dark:bg-gray-900 py-6 mt-12 border-t border-gray-200 dark:border-gray-700 mt-200">
      <div className="max-w-screen-xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between">
        <span className="text-sm text-gray-500 dark:text-gray-400">© {new Date().getFullYear()} Food App. All rights reserved.</span>
        <div className="flex space-x-4 mt-2 sm:mt-0">
          <a href="/" className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 text-sm">Home</a>
                    <a href="/favourites" className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 text-sm">Favourites</a>
          <a href="/about" className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 text-sm">About</a>
        </div>
      </div>
    </footer>
  );
}
