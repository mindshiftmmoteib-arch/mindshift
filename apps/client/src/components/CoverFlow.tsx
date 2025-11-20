"use client";

import { useState } from "react";
import Image from "next/image";

interface Certificate {
  title: string;
  image: string;
  alt: string;
}

interface CoverFlowProps {
  certificates: Certificate[];
}

export default function CoverFlow({ certificates }: CoverFlowProps) {
  const [activeIndex, setActiveIndex] = useState(1); // Start with middle certificate

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : certificates.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < certificates.length - 1 ? prev + 1 : 0));
  };

  const getTransformStyle = (index: number) => {
    const position = index - activeIndex;

    if (position === 0) {
      // Center card - full size and focused
      return {
        transform: "translateX(0) scale(1) rotateY(0deg)",
        zIndex: 30,
        opacity: 1,
      };
    } else if (position === -1) {
      // Left card
      return {
        transform: "translateX(-80%) scale(0.75) rotateY(35deg)",
        zIndex: 20,
        opacity: 0.6,
      };
    } else if (position === 1) {
      // Right card
      return {
        transform: "translateX(80%) scale(0.75) rotateY(-35deg)",
        zIndex: 20,
        opacity: 0.6,
      };
    } else if (position < -1) {
      // Far left cards
      return {
        transform: "translateX(-120%) scale(0.5) rotateY(45deg)",
        zIndex: 10,
        opacity: 0.3,
      };
    } else {
      // Far right cards
      return {
        transform: "translateX(120%) scale(0.5) rotateY(-45deg)",
        zIndex: 10,
        opacity: 0.3,
      };
    }
  };

  return (
    <div className="space-y-8">
      {/* CoverFlow Container */}
      <div className="relative h-[500px] w-full flex items-center justify-center overflow-hidden">
        <div className="relative w-full max-w-4xl h-full" style={{ perspective: "2000px" }}>
          {certificates.map((cert, index) => {
            const style = getTransformStyle(index);
            const isActive = index === activeIndex;

            return (
              <div
                key={index}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out cursor-pointer"
                style={{
                  ...style,
                  transformOrigin: "center center",
                }}
                onClick={() => setActiveIndex(index)}
              >
                <div
                  className={`rounded-xl border border-slate-200 bg-[#f8f4ed] shadow-2xl p-6 space-y-4 w-[350px] sm:w-[400px] ${
                    isActive ? "shadow-2xl" : "shadow-lg"
                  }`}
                >
                  <h3 className="text-lg font-bold text-slate-900 text-center">
                    {cert.title}
                  </h3>
                  <div className="relative w-full h-[350px] sm:h-[400px]">
                    <Image
                      src={cert.image}
                      alt={cert.alt}
                      fill
                      className="object-contain"
                      priority={isActive}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center gap-6">
        <button
          onClick={handlePrevious}
          className="px-6 py-3 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous certificate"
        >
          Previous
        </button>

        <div className="flex gap-2">
          {certificates.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "bg-slate-900 w-8"
                  : "bg-slate-300 hover:bg-slate-400"
              }`}
              aria-label={`Go to certificate ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="px-6 py-3 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next certificate"
        >
          Next
        </button>
      </div>

      {/* Current Certificate Title */}
      <div className="text-center">
        <p className="text-sm text-slate-600">
          {activeIndex + 1} of {certificates.length}
        </p>
      </div>
    </div>
  );
}
