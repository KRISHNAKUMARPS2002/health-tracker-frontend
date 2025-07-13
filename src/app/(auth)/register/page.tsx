// src/app/(auth)/register/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import RegisterForm from "@/app/components/auth/RegisterForm";

export default function RegisterPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.replace("/dashboard");
    }
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-300 to-green-300">
      <RegisterForm />
    </main>
  );
}
