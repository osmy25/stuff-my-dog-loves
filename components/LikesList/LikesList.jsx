"use client";

import { useEffect, useState } from "react";

export default function LikesList() {
  const [likes, setLikes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function getDogInterests() {
      const response = await fetch("/api/dog-likes");
      const data = await response.json();
      setLikes(data.likes);
      setCurrentIndex(0);
    }

    getDogInterests();
  }, []);

  function handleNext() {
    if (likes.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % likes.length);
  }

  function handlePrev() {
    if (likes.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + likes.length) % likes.length);
  }

  const currentLike = likes[currentIndex];

  return (
    <div className="mt-10 flex flex-col items-center gap-5">
      <div className="w-full max-w-md rounded-[2rem] border-4 border-emerald-200 bg-gradient-to-b from-emerald-100 via-sky-100 to-rose-100 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
        {currentLike && (
          <>
            <div className="flex h-72 w-full items-end justify-center overflow-hidden">
              <img
                src={currentLike.image}
                alt={currentLike.name}
                className="pixelated h-80 w-80 -translate-y-6"
              />
            </div>

            <div className="pt-4 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-700/70">
                Dog approved
              </p>

              <p className="mt-2 text-3xl font-extrabold text-emerald-900">
                {currentLike.name}
              </p>
            </div>
          </>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handlePrev}
          disabled={likes.length === 0}
          className="rounded-full border-2 border-emerald-200 bg-emerald-100 px-5 py-2.5 font-bold text-emerald-900 transition hover:-translate-y-0.5 hover:bg-emerald-200 disabled:opacity-50"
        >
          ← Prev
        </button>

        <button
          onClick={handleNext}
          disabled={likes.length === 0}
          className="rounded-full border-2 border-rose-200 bg-rose-100 px-5 py-2.5 font-bold text-rose-900 transition hover:-translate-y-0.5 hover:bg-rose-200 disabled:opacity-50"
        >
          Next →
        </button>
      </div>
    </div>
  );
}