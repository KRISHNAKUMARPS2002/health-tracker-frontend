// src/components/ui/Button.tsx
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

export default function Button({
  children,
  variant = "primary",
  ...props
}: ButtonProps) {
  const base =
    "px-4 py-2 rounded text-white font-medium transition-colors cursor-pointer";
  const styles = {
    primary: "bg-primary hover:bg-blue-800",
    secondary: "bg-secondary hover:bg-green-500",
  };

  return (
    <button className={`${base} ${styles[variant]}`} {...props}>
      {children}
    </button>
  );
}
