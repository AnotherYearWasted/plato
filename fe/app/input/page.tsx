'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const SessionGoalInput = () => {
  const [goal, setGoal] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50 px-4">
      <div className="bg-gradient-to-b from-pink-400 to-purple-700 p-10 rounded-3xl shadow-lg text-white text-center w-96">
        <h2 className="text-2xl font-bold mb-6">{status === "first"
            ? "What is your goal for this session?"
            : "What is your goal for the next session?"}</h2>
        <input
          type="text"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="Type here..."
          className="w-full px-6 py-4 text-lg text-black rounded-full outline-none focus:ring-4 focus:ring-pink-400"
        />
      </div>
      <button
        onClick={() => router.push("/session")}
        className="mt-8 px-8 py-4 text-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full shadow-md hover:opacity-90"
      >
        {status === "first" ? "Start" : "Continue"}
      </button>
    </div>
  );
};

export default SessionGoalInput;
