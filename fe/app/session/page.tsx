"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const SessionTimer = () => {
  const router = useRouter();
  const [time, setTime] = useState(3); // 3 seconds for testing
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  useEffect(() => {
    // -- 1. Set up the WebSocket to the FastAPI /video endpoint.
    const ws = new WebSocket("ws://localhost:8000/video"); 
    // If your server is running on a different domain or port, adjust accordingly.

    // Called when the WebSocket is successfully connected
    ws.onopen = () => {
      console.log("WebSocket connected to /video");
    };

    // Called whenever the server sends a message (base64-encoded frame)
    ws.onmessage = (event) => {
      // The event.data should be a base64 string representing the JPEG frame.
      // We convert it into a data URL so <img> can display it.
      const base64Data = event.data as string;
      setImgSrc(`data:image/jpeg;base64,${base64Data}`);
    };

    // Called if the WebSocket is closed or an error occurs
    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };
    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    // Cleanup function when the component unmounts
    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    // -- 2. Session timer logic
    if (time === 0) {
      handleTimeEnd();
      return;
    }
    const timer = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [time]);

  const handleTimeEnd = () => {
    // This triggers navigation to /analysis when the timer reaches 0
    router.push("/analysis");
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50 text-gray-900 relative">
      {/* Timer Display */}
      <div className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-5xl font-bold absolute top-10">
        {formatTime(time)}
      </div>

      {/* Live Video Feed */}
      {imgSrc ? (
        <img
          src={imgSrc}
          alt="Live Video"
          className="mt-24 border-4 border-purple-500 rounded-lg"
          width={640}
          height={384}
        />
      ) : (
        <p className="mt-24 text-xl">Connecting to camera feed...</p>
      )}

      {/* END SESSION Button */}
      <button
        onClick={() => router.push("/")}
        className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-2xl font-bold absolute bottom-20"
      >
        END SESSION
      </button>
    </div>
  );
};

export default SessionTimer;

