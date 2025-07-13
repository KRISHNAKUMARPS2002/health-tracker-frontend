"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "./components/ui/Button";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("health_token");
    if (token) {
      router.replace("/dashboard");
    }
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-heading text-primary">
          Welcome to Health Tracker
        </h1>
        <p className="text-sm md:text-lg text-text">
          Track your health and habits easily.
        </p>
        <div className="space-x-2 md:space-x-4">
          <Link href="/register">
            <Button variant="primary">Register</Button>
          </Link>
          <Link href="/login">
            <Button variant="secondary">Login</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
