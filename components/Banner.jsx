"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { bannerData } from "@/data/bannerData";

const AUTOPLAY_MS = 4500;

export default function Banner() {
  const slides = useMemo(() => bannerData, []);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return undefined;

    const timerId = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, AUTOPLAY_MS);

    return () => clearInterval(timerId);
  }, [slides.length]);

  if (!slides.length) return null;

  const currentBanner = slides[currentIndex];

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative z-0 w-full">
      <article
        className="relative h-[350px] w-full overflow-hidden sm:h-[400px] lg:h-[440px]"
        style={{
          backgroundImage: `url(${currentBanner.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 mx-auto flex h-full w-full max-w-5xl flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="text-3xl font-bold leading-tight transition-all duration-500 sm:text-4xl lg:text-5xl">
            {currentBanner.title}
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-white/90 transition-all duration-500 sm:text-base lg:text-lg">
            {currentBanner.description}
          </p>
          <Link
            href={currentBanner.link}
            className="mt-6 rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:scale-105 hover:bg-emerald-700 sm:text-base"
          >
            {currentBanner.buttonText}
          </Link>
        </div>

        {slides.length > 1 ? (
          <>
            <button
              type="button"
              onClick={goToPrev}
              aria-label="Previous banner"
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/20 px-3 py-2 text-2xl text-white backdrop-blur-sm transition hover:bg-white/30"
            >
              &#8249;
            </button>
            <button
              type="button"
              onClick={goToNext}
              aria-label="Next banner"
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/20 px-3 py-2 text-2xl text-white backdrop-blur-sm transition hover:bg-white/30"
            >
              &#8250;
            </button>

            <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to banner ${index + 1}`}
                  className={`h-2.5 w-2.5 rounded-full transition ${
                    index === currentIndex ? "bg-white" : "bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          </>
        ) : null}
      </article>
    </section>
  );
}
