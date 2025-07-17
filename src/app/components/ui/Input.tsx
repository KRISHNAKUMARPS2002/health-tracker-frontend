// src/components/ui/Input.tsx
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Input(props: InputProps) {
  return (
    <input
      {...props}
      className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white text-black shadow-sm transition focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary"
    />
  );
}
