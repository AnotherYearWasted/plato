import React from "react";
import { useRouter } from "next/navigation";


interface StartSessionButtonProps {
  className?: string;
}

const StartSessionButton = ({ className }: StartSessionButtonProps) => {
    const router = useRouter();
  return (
    <button 
    onClick={() => router.push("/webcam")}
    className={`px-16 py-8 text-3xl md:text-4xl font-semibold text-white rounded-full bg-gradient-to-b from-pink-500 to-purple-700 shadow-lg hover:scale-105 transition-transform ${className}`}>
      Start session
    </button>
  );
};

export default StartSessionButton;
