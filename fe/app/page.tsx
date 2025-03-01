"use client";

import React, { useEffect } from "react";
import Header from "@/components/Header";
import NavigationContent from "@/interfaces/NavigationContent";
import StartSessionButton from "@/components/StartSessionButton";
import LoginButton from "@/components/LoginButton";

const navContents: NavigationContent[] = [
  { name: "Insights", link: "projects" },
];

const Home = () => {

  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  useEffect(() => {
    fetch("/api/init");
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#fdf8fc]">
      {/* Header */}
      <div className="absolute w-full z-20">
        <Header navContents={navContents} setIsAuthenticate={setIsAuthenticated}/>
      </div>

      {/* Main Content */}
      <div className="flex justify-center items-center h-screen bg-pink-50 relative">
        {isAuthenticated && <StartSessionButton /> }
        {!isAuthenticated && <LoginButton /> }
      </div>
    </div>
  );
};

export default Home;
