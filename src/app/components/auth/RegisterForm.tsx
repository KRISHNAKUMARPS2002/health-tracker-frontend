// src/components/auth/RegisterForm.tsx
"use client";

import { useState } from "react";
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

  const [showPassWord, setShowPassword] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      name,
      email,
      password,
      age: parseInt(age),
      gender,
      marital_status,
      weight: parseFloat(weight),
      height: parseFloat(height),
    });
    // TODO: Add API logic here
  };

  return (
    <form
      onSubmit={handleRegister}
      className="space-y-4 max-w-md mx-auto rounded-2xl p-6 bg-white backdrop-blur-md border border-white/20 shadow-lg z-40"
    >
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
        <Button type="submit" variant="secondary">
          Register
        </Button>
      </div>
    </form>
  );
}
