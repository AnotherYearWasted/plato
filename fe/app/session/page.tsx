'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const SERVER_URL = "http://127.0.0.1:8000";

const SessionTimer = () => {
  const router = useRouter();

  // Basic state
  const [time, setTime] = useState(10); // for testing
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  // On mount, start tracking + open the WebSocket
  useEffect(() => {
    // 1) Mark session as running
    sessionStorage.setItem("running", "true");

    // 2) Start the browser activity tracking
    fetch(`${SERVER_URL}/start_tracking`, { method: "POST" })
      .then((res) => res.json())
      .then((data) => console.log("Tracking started:", data))
      .catch((err) => console.error("Error starting tracking:", err));

    // 3) Open the WebSocket for video streaming
    const ws = new WebSocket("ws://localhost:8000/video");

    ws.onopen = () => {
      console.log("WebSocket connected to /video");
    };

    ws.onmessage = (event) => {
      const base64Data = event.data as string;
      setImgSrc(`data:image/jpeg;base64,${base64Data}`);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    // Cleanup on unmount: close WebSocket and stop tracking
    return () => {
      console.log("Unmounting /session page. Closing WebSocket and stopping tracking.");
      ws.close();

      // Optionally also call stopTracking here if you want to end tracking
      // whenever the user leaves the page:
      fetch(`${SERVER_URL}/stop_tracking`, { method: "POST" })
        .then((res) => res.json())
        .then((data) => console.log("Tracking stopped:", data))
        .catch((err) => console.error("Error stopping tracking:", err));

      sessionStorage.setItem("running", "false");
    };
  }, []);

  // Simple countdown timer
  useEffect(() => {
    if (time === 0) {
      handleTimeEnd();
      return;
    }
    const timer = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [time]);

  // When timer reaches 0, navigate away (which unmounts + closes WebSocket)
  const handleTimeEnd = () => {
    router.push("/summary");
  };

  // Manual "END SESSION" button
  const handleEndSession = () => {
    router.push("/");
  };

  // Utility to format seconds into M:SS
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

      {/* End Session Button */}
      <button
        onClick={handleEndSession}
        className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-2xl font-bold absolute bottom-20"
      >
        END SESSION
      </button>
    </div>
  );
};

export default SessionTimer;

