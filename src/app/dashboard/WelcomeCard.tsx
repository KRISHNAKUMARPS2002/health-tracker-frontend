"use client";
import React, { useState, useEffect } from "react";
import Card from "../components/ui/Card";
import { User } from "@/app/lib/types/user";

const Welcomecard = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser: User = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing using:", error);
      }
    }
  }, []);
  return (
    <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
      <div className="flex flex-col min-[350px]:flex-row min-[350px]:items-center min-[350px]:justify-between gap-2 min-[350px]:gap-0">
        <div>
          <h1 className="text-sm sm:text-xl font-bold mb-1">
            Hello, {user?.name || "Guest"}! 👋
          </h1>
          <p className="text-blue-100 text-sm sm:text-xl">
            Your health at a glance
          </p>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-blue-100 text-sm">Today</p>
          <p className="text-white font-semibold">
            {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default Welcomecard;
