// src/app/components/layout/Header.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/app/lib/types/user";

const Header = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser) as User;
        setUser(parsedUser);
      } catch (err) {
        console.error("Failed to parse user:", err);
      }
    }
  }, []);

  const handleProfileClick = () => {
    router.push("/profile");
  };
  return (
    <div className="flex items-center justify-between px-8 py-4 bg-white shadow-sm border-b border-gray-100">
      <p className="text-xl font-bold text-gray-900">Health Tracker</p>
      {user && (
        <button
          onClick={handleProfileClick}
          className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm cursor-pointer"
        >
          {user.name?.charAt(0).toUpperCase()}
        </button>
      )}
    </div>
  );
};

export default Header;
