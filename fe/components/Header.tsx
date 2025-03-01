"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface NavContent {
  name: string;
  link: string;
}

interface HeaderProps {
  navContents?: NavContent[];
  setIsAuthenticate: (isAuthenticated: boolean) => void;
}

interface User {
  username: string;
  email: string;
}

// Custom hook to detect clicks outside the popup
const useClickOutside = (ref: React.RefObject<HTMLElement>, callback: () => void) => {

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
};

const Header = ({ navContents, setIsAuthenticate }: HeaderProps) => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const popupRef = useRef<HTMLElement>(null); // Properly typed as HTMLElement
  const [user, setUser] = useState<User | null>(null);
  // Close the popup when clicking outside
  useClickOutside(popupRef, () => {
    setPopupVisible(false);
  });

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  useEffect(() => {
    fetch("/api/auth", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("cookie")}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          res.json().then((data) => {
            setUser(data.message);
            setIsAuthenticate(true);
          });
        }
      })
  }, [])

  return (
    <nav className="flex justify-between items-center bg-white bg-opacity-50 backdrop-blur-sm text-black px-6 py-4 shadow-sm">
      {/* Left: Logo */}
      <Link href="/" className="flex items-center gap-2 text-xl font-bold">
        <Image src="/zen_logo.svg" alt="Zenwork Logo" width={50} height={50} />
        Zenwork
      </Link>

      {/* Right: Navigation and Profile */}
      <div className="flex items-center gap-6 text-xl">
        {navContents?.map((item, index) => (
          <Link key={index} href={item.link} className="hover:underline font-bold">
            {item.name}
          </Link>
        ))}
        {!user && <Link href="/login" className="hover:underline font-bold">Login</Link>}
        {user && <div className="flex items-center gap-3 relative">
          {/* Profile Picture */}
          <button onClick={togglePopup} className="focus:outline-none">
            <Image
              src="/user-profile-icon.svg"
              alt="User Avatar"
              width={32}
              height={32}
              className="rounded-full"
            />
          </button>

          {/* Username */}

          <span className="text-xl">{user?.username}</span>

          {/* Popup */}
          {isPopupVisible && (
            <div
              ref={popupRef}
              className="absolute right-0 top-12 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
            >
              <div className="p-4">
                <div className="text-sm font-semibold text-gray-800">{ }</div>
                <div className="text-xs text-gray-500">{ }</div>
              </div>
              <hr className="border-gray-200" />

              {/* Flow Duration */}
              <div className="px-4 py-2">
                <label className="text-sm text-gray-700">Flow duration</label>
                <input
                  type="number"
                  defaultValue={45}
                  className="w-full mt-1 px-2 py-1 text-sm border border-gray-300 rounded"
                />
              </div>

              {/* Break Duration */}
              <div className="px-4 py-2">
                <label className="text-sm text-gray-700">Break duration</label>
                <input
                  type="number"
                  defaultValue={5}
                  className="w-full mt-1 px-2 py-1 text-sm border border-gray-300 rounded"
                />
              </div>

              {/* Auto-start Break */}
              <div className="px-4 py-2">
                <label className="flex items-center text-sm text-gray-700">
                  <input
                    type="checkbox"
                    className="mr-2"
                  />
                  Auto-start break
                </label>
              </div>

              <hr className="border-gray-200" />

              {/* Dark Mode and Log Out */}
              <ul className="py-2">
                <li>
                  <button
                    onClick={() => {
                      // Handle Dark Mode toggle
                      togglePopup();
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Dark Mode
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      // Handle Log Out
                      fetch("/api/logout", {
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${localStorage.getItem("cookie")}`,
                        }
                      })
                        .then(async (res) => {
                          if (res.status === 200) {
                            
                            setTimeout(() => {
                              window.location.href = "/";
                            }, 2000);
                          }
                        })
                      togglePopup();
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Log Out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
        }
      </div>
    </nav>
  );
};

export default Header;
