// src/components/auth/LoginForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/app/lib/api/axios";
import { TOKEN_KEY } from "../../../../constants";
import { LoginInput, LoginResponse } from "@/app/lib/types";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassWord, setShowPassword] = useState(false);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const data: LoginInput = {
      email,
      password,
    };

    try {
      const res = await api.post<LoginResponse>("/auth/login", data);
      const { token, message } = res.data;

      console.log("✅ Login successful:", message);
      alert("Login successful!");

      localStorage.setItem(TOKEN_KEY, token);

      // Redirect to dashboard or home
      router.push("/dashboard");
    } catch (error: any) {
      console.error("❌ Login failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="space-y-6 w-[400px] mx-auto rounded-2xl p-8 bg-white backdrop-blur-md border border-white/20 shadow-xl"
    >
      <h2 className="text-2xl font-heading text-center text-primary">Login</h2>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <div className="relative">
        <Input
          type={showPassWord ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
        >
          {showPassWord ? (
            <BsFillEyeSlashFill size={20} />
          ) : (
            <BsFillEyeFill size={20} />
          )}
        </button>
      </div>
      <div className="flex items-center justify-center">
        <Button type="submit" variant="primary">
          Login
        </Button>
      </div>
    </form>
  );
}
