//@ts-nocheck
"use client";
import { useEffect, useState } from "react";

export default function QuoteSection() {
  const [quotes, setQuotes] = useState([]);
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    async function fetchQuotes() {
      const res = await fetch("https://dummyjson.com/quotes?limit=530");
      const data = await res.json();
      setQuotes(data.quotes || []);
    }
    fetchQuotes();
  }, []);

  useEffect(() => {
    if (quotes.length === 0) return;

    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCount((prev) => (prev + 1) % quotes.length);
        setIsVisible(true);
      }, 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, [quotes]);

  const currentQuote = quotes[count]?.quote || "Loading...";
  const currentAuthor = quotes[count]?.author || "";

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center  p-6">
      <div
        className={`text-center max-w-2xl px-4 py-4 rounded-xl transition-opacity duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        } `}
      >
        <p className="text-md md:text-lg font-semibold text-gray-800 italic">
          “{currentQuote}”
        </p>
        <p className="mt-4 text-sm md:text-md text-gray-600 font-medium">
          — {currentAuthor}
        </p>
      </div>
    </div>
  );
}
