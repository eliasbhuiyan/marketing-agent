"use client";
import React, { useEffect, useState } from "react";
const LoaderAnim = ({ children }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const loadingTexts = [
    "AI is generating content...",
    "It's almost done...",
    "Please wait a second...",
    "Thanks for your patience...",
    "Processing your request...",
    "Finalizing details...",
    "Almost there...",
    "Just a moment more...",
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="rounded-lg w-full">
      <div className="text-center">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
        <div className="overflow-hidden h-6 relative">
          {loadingTexts.map((text, index) => (
            <div
              key={index}
              className={`absolute inset-0 flex items-center justify-center text-white font-medium flip-text ${
                index === currentTextIndex ? "block" : "hidden"
              }`}
            >
              {text}
            </div>
          ))}
        </div>
        <div className="flex justify-center space-x-1 mt-4">
          <div className="w-3 h-3 bg-white rounded-full loading-dot"></div>
          <div className="w-3 h-3 bg-white rounded-full loading-dot"></div>
          <div className="w-3 h-3 bg-white rounded-full loading-dot"></div>
        </div>
      </div>
    </div>
  );
};

export default LoaderAnim;
