"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Header from "../components/layout/Header";
import Welcomecard from "./WelcomeCard";
import VitalsCard from "./VitalsCard";

const DashboardPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <div className="px-3 sm:px-10 mt-8">
        <Welcomecard />
      </div>
      <div className="mt-8 px-3 sm:px-10">
        <VitalsCard />
      </div>
    </div>
  );
};

export default DashboardPage;
