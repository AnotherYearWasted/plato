"use client";

import React from "react";
import Header from "@/components/Header";
import NavigationContent from "@/interfaces/NavigationContent";
import StartSessionButton from "@/components/StartSessionButton";

const navContents: NavigationContent[] = [
  { name: "Insights", link: "projects" },
];

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#fdf8fc]">
      {/* Header */}
      <div className="absolute w-full z-20">
        <Header navContents={navContents} />
      </div>

      {/* Main Content */}
      <div className="flex justify-center items-center h-screen bg-pink-50 relative">
        <StartSessionButton className="absolute bottom-40" /> {/* Adjust position */}
      </div>
    </div>
  );
};

export default Home;
