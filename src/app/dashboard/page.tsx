"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { TOKEN_KEY } from "../../../constants";
import Button from "@/app/components/ui/Button"; // if you're using a custom Button

const DashboardPage = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY); // 🧹 Clear token
    router.replace("/login"); // 🔁 Redirect to login
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6">
      <h1 className="text-2xl font-bold text-primary">
        Welcome to the Dashboard
      </h1>

      {/* Logout Button */}
      <Button onClick={handleLogout} variant="secondary">
        Logout
      </Button>
    </div>
  );
};

export default DashboardPage;
