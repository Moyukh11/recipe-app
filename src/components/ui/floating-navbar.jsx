"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const FloatingNav = ({
  navItems,
  className,
}) => {
  return (
    <div
      className={cn(
        "mx-auto my-6 flex flex-wrap justify-center gap-2 w-full max-w-full sm:max-w-4xl items-center rounded-full border border-transparent bg-white px-3 py-3 sm:px-4 sm:py-2 text-neutral-600 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]",
        className
      )}>
      {navItems.map((navItem, idx) => (
        <a
          key={`link=${idx}`}
          href={navItem.link}
          className={cn(
            "relative flex min-w-[120px] items-center justify-center space-x-1 rounded-full px-3 py-2 text-sm text-neutral-600 transition hover:text-neutral-500 sm:min-w-0"
          )}>
          <span className="block sm:hidden">{navItem.icon}</span>
          <span className="hidden sm:block text-sm">{navItem.name}</span>
        </a>
      ))}
    </div>
  );
};
