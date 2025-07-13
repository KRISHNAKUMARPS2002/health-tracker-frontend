// src/components/auth/RegisterForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/app/lib/api/axios";
import { RegisterInput } from "@/app/lib/types/user";
import Card from "../ui/Card";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Select from "../ui/Select";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [marital_status, setMaritalStatus] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [blood_group, setBloodGroup] = useState("");
  const [showPassWord, setShowPassword] = useState(false);

  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const data: RegisterInput = {
      name,
      email,
      password,
      age: parseInt(age),
      gender,
      marital_status,
      weight: parseFloat(weight),
      height: parseFloat(height),
      blood_group,
    };

    try {
      const res = await api.post("/auth/register", data);
      console.log("✅ Registration success:", res.data);

      alert("Registration successful!");
      router.replace("/login"); // navigate to login page
    } catch (error: any) {
      console.error(
        "❌ Registration failed:",
        error.response?.data || error.message
      );
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <form onSubmit={handleRegister} className="space-y-4 ">
        <h2 className="text-2xl font-heading text-center text-primary">
          Register
        </h2>
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {/* PASSWORD EYE TOGGLE */}
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
        <Input
          type="text"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <Select
          label="Gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          options={[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
            { label: "Other", value: "other" },
          ]}
        />
        <Select
          label="Marital Status"
          value={marital_status}
          onChange={(e) => setMaritalStatus(e.target.value)}
          options={[
            { label: "Single", value: "single" },
            { label: "Married", value: "married" },
          ]}
        />
        <Select
          label="Blood Group"
          value={blood_group}
          onChange={(e) => setBloodGroup(e.target.value)}
          options={[
            { label: "A+", value: "A+" },
            { label: "A-", value: "A-" },
            { label: "B+", value: "B+" },
            { label: "B-", value: "B-" },
            { label: "AB+", value: "AB+" },
            { label: "AB-", value: "AB-" },
            { label: "O+", value: "O+" },
            { label: "O-", value: "O-" },
          ]}
        />

        <Input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
        />
        <Input
          type="number"
          placeholder="Height (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          required
        />
        <div className="flex items-center justify-center">
          <Button type="submit" variant="secondary" size="md">
            Register
          </Button>
        </div>
        <p className="text-sm text-center text-gray-600">
          Have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Login
          </a>
        </p>
      </form>
    </Card>
  );
}
