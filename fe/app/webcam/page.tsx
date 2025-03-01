"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Webcam from "react-webcam";

const WebcamPage = () => {
  const webcamRef = useRef<Webcam>(null);
  const router = useRouter();
  const [captured, setCaptured] = useState(false);

  const captureAndSend = async () => {
    if (!webcamRef.current) return;

    // Capture the image as a Blob
    const imageSrc = webcamRef.current.getScreenshot();
    const blob = await fetch(imageSrc!).then((res) => res.blob());

    // Create FormData and append the image file
    const formData = new FormData();
    formData.append("file", blob, "capture.jpg");

    // Simulate sending to backend (commented out for now)
    // await fetch("http://127.0.0.1:8000/upload", {
    //   method: "POST",
    //   body: formData,
    // });

    setCaptured(true);

    // Navigate to the input page after successful upload
    setTimeout(() => router.push("/input?status=first"), 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50 text-gray-900">
      <h1 className="text-xl font-semibold text-center mb-4">
        Please Sit Upright And Position Yourself in the Frame
      </h1>
      <div className="relative border-4 border-dashed border-gray-400 rounded-lg p-4">
        <Webcam ref={webcamRef} screenshotFormat="image/jpeg" className="rounded-lg" />
        <div className="absolute top-10 right-10 w-30 h-30">
          <Image src="/standard-posture.svg" alt="Overlay" width={80} height={80} className="rounded-lg" />
        </div>
      </div>
      <button
        onClick={captureAndSend}
        className="mt-6 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-lg font-medium"
      >
        Take Picture
      </button>
      {captured && (
        <p className="text-green-600 mt-4 font-medium">Image captured! Redirecting...</p>
      )}
    </div>
  );
};

export default WebcamPage;
