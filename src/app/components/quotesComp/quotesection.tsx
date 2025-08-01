// @ts-nocheck
"use client";

import { quotes } from "@/app/utils/data";
import { useEffect, useState } from "react";

export default function QuoteSection() {
  const quotesData = quotes || [];
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCount((prev) => (prev + 1) % quotesData.length);
        setIsVisible(true);
      }, 1000);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const currentQuote = quotesData[count]?.quote || "No quote available";
  const currentAuthor = quotesData[count]?.author || "";

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center  p-6">
      <div
        className={`text-center  px-4 py-4 rounded-xl transition-opacity duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        } `}
      >
        <p className="text-lg md:text-lg font-semibold text-gray-800 italic">
          “{currentQuote}”
        </p>
        <p className="mt-4 text-sm md:text-md text-gray-600 font-medium">
          — {currentAuthor}
        </p>
      </div>
    </div>
  );
}
