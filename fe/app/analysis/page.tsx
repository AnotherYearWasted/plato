"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const TimerUI = () => {
  const router = useRouter();
  const [time, setTime] = useState(225); // 3 minutes 45 seconds

  useEffect(() => {
    if (time === 0) return;
    const timer = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [time]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50 text-gray-900 relative p-6">
      {/* Timer Display */}
      <div className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full text-5xl font-bold absolute top-10">
        {formatTime(time)}
      </div>

      {/* Continue Button with more spacing from screen edges */}
      <button
        onClick={() => router.push("/input?status=not-first")}
        className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full text-2xl font-bold absolute bottom-20 right-20"
      >
        Continue
      </button>
    </div>
  );
};

export default TimerUI;