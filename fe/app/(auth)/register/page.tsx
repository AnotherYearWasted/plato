"use client";

import CryptoJS from "crypto-js"; // 🔹 Add this import
import Link from "next/link";
import React, { useEffect } from "react";

const Register = () => {

  const [submitStatus, setSubmitStatus] = React.useState(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const username = formData.get("username");
    const password = formData.get("password") as string;
    const email = formData.get("email");

    if (!username || !password || !email) {
      console.log("Username and password and email are required");
      return;
    }

    const passwordHashed = CryptoJS.SHA256(password).toString();

    fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password: passwordHashed, email: email }),
    })
      .then((res) => {
        setSubmitStatus(res.status);
      })
  };

  useEffect(() => {
    if (submitStatus === 200) {
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    }
  }
  , [submitStatus]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <form
        className="bg-white flex flex-col p-4 gap-8 rounded-2xl"
        onSubmit={handleSubmit}
      >
        <div className="font-bold text-2xl">Register your account</div>
        <div className="w-full gap-4 flex flex-col relative">
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
          </div>
          <div>
            <div className="text-sm font-semibold">Email</div>
            <label>
              <input
                type="email"
                name="email"
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded outline-none focus-within:border-blue"
              />
            </label>
            <div className={`absolute text-red-500 text-sm transition duration-300 ${submitStatus === 401 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}>
              Username or email have already been used, please <Link href="/login">login</Link>
            </div>
            <div className={`absolute text-green-400 text-xs transition duration-300 w-full text-wrap ${submitStatus === 200 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}>
              Account created successfully, redirecting to login...
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <button className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-lg font-medium w-full hover:scale-90 transition duration-300">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;