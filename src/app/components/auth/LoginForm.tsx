// src/components/auth/LoginForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/app/lib/api/axios";
import { TOKEN_KEY } from "../../../../constants";
import { LoginInput, LoginResponse } from "@/app/lib/types/user";
import { fetchUserProfile } from "@/app/lib/api/user";
import Input from "../ui/Input";
import Button from "../ui/Button";
import toast from "react-hot-toast";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import Card from "../ui/Card";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassWord, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data: LoginInput = {
      email,
      password,
    };

    try {
      const res = await api.post<LoginResponse>("/auth/login", data);
      const { token, message } = res.data;

      localStorage.setItem(TOKEN_KEY, token);

      // ✅ Fetch profile before redirect
      const user = await fetchUserProfile();
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Login successful!");
      // Redirect to dashboard or home
      router.replace("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-[400px] mx-auto">
      <form onSubmit={handleLogin} className="space-y-6">
        <h2 className="text-2xl font-heading text-center text-primary">
          Login
        </h2>
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
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </div>
        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Register
          </a>
        </p>
      </form>
    </Card>
  );
}
