import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  gradient?: boolean;
}

const Card = ({ children, className = "", gradient = false }: CardProps) => (
  <div
    className={`rounded-3xl p-3 sm:p-6 shadow-lg transition-all duration-300 hover:shadow-xl ${
      gradient ? "bg-gradient-to-br from-blue-50 to-indigo-100" : "bg-white"
    } ${className}`}
  >
    {children}
  </div>
);

export default Card;
