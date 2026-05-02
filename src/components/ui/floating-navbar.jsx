"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const FloatingNav = ({ navItems, className }) => {
  return (
    <div
      className={cn(
        "mx-auto my-6 flex flex-nowrap justify-between items-center w-[90%] max-w-md rounded-full bg-white px-6 py-4 text-neutral-600 shadow-md",
        className
      )}
    >
      {navItems.map((navItem, idx) => (
        <a
          key={`link=${idx}`}
          href={navItem.link}
          className="flex-1 text-center text-sm font-medium whitespace-nowrap"
        >
          {navItem.name}
        </a>
      ))}
    </div>
  );
};
