"use client";

import CryptoJS from "crypto-js"; // 🔹 Add this import
import React, { useEffect } from "react";

const Login = () => {

  const [submitStatus, setSubmitStatus] = React.useState(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const username = formData.get("username");
    const password = formData.get("password") as string;

    if (!username || !password) {
      console.log("Username and password are required");
      return;
    }

    const passwordHashed = CryptoJS.SHA256(password).toString();

    fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password: passwordHashed }),
    })
      .then(async (res) => {
        setSubmitStatus(res.status);
        if (res.status === 200) {
          const body = await res.json();
          
          localStorage.setItem("cookie", body.cookie);
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        }
      })
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <form
        className="bg-white flex flex-col p-4 gap-8 rounded-2xl"
        onSubmit={handleSubmit}
      >
        <div className="font-bold text-2xl">Login your account</div>
        <div className="w-full gap-4 flex flex-col">
          <div>
            <div className="text-sm font-semibold">Username</div>
            <label>
              <input
                type="text"
                name="username"
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded outline-none focus-within:border-blue"
              />
            </label>
          </div>
          <div>
            <div className="text-sm font-semibold">Password</div>
            <label>
              <input
                type="password"
                name="password"
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded outline-none focus-within:border-blue"
              />
            </label>
            <div className={`absolute text-red-500 text-sm transition duration-300 ${submitStatus === 401 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}>
              Wrong username or password
            </div>
            <div className={`absolute text-green-400 text-sm transition duration-300 w-full text-wrap ${submitStatus === 200 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}>
              Login successful, redirecting...
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <button className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-lg font-medium w-full hover:scale-90 transition duration-300">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;