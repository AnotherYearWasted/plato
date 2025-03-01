"use client";

import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

const WebcamCapture = ({ onCapture }: { onCapture: (image: string) => void }) => {
  const webcamRef = useRef<Webcam>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
      onCapture(imageSrc);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {!capturedImage ? (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/png"
            className="rounded-lg"
          />
          <button
            onClick={capture}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Capture Photo
          </button>
        </>
      ) : (
        <img src={capturedImage} alt="Captured" className="rounded-lg mt-4" />
      )}
    </div>
  );
};

export default WebcamCapture;
