// src/components/ui/Input.tsx
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Input(props: InputProps) {
  return (
    <input
      {...props}
      className="w-full px-6 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
    />
  );
}
