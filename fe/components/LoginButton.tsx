import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";


interface LoginButtonProps {
  className?: string;
}

const LoginButton = ({ className }: LoginButtonProps) => {
  return (
    <Link href="/login">
      <button
        className={`px-16 py-8 text-3xl md:text-4xl font-semibold text-white rounded-full bg-gradient-to-b from-pink-500 to-purple-700 shadow-lg hover:scale-105 transition-transform ${className}`}>
        Login to start
      </button>
    </Link>
  );
};

export default LoginButton;
