"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { TOKEN_KEY } from "../../../constants";
import Button from "@/app/components/ui/Button";
import Header from "../components/layout/Header";

const DashboardPage = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY); // 🧹 Clear token
    router.replace("/login"); // 🔁 Redirect to login
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />

      {/* Logout Button */}
      <Button onClick={handleLogout} variant="secondary">
        Logout
      </Button>
    </div>
  );
};

export default DashboardPage;
