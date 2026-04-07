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

  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-lg border p-4">
        {likes.length > 0 && (
          <>
            <div className="w-full h-64 flex items-end justify-center overflow-hidden">
              <img
                src={likes[currentIndex].image}
                alt={likes[currentIndex].name}
                className="w-80 h-80 pixelated -translate-y-8"
              />
            </div>

            <p className="mt-2 text-2xl font-bold text-gray-800 text-center">
              {likes[currentIndex].name}
            </p>
          </>
        )}
      </div>

      <div className="flex gap-4">
        <button
          onClick={handlePrev}
          disabled={likes.length === 0}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
        >
          Prev
        </button>

        <button
          onClick={handleNext}
          disabled={likes.length === 0}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}