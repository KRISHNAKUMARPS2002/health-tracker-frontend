// src/components/ui/Select.tsx
import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";

interface Option {
  label: string;
  value: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
}

export default function Select({ label, options, ...props }: SelectProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="space-y-1 relative">
      {label && (
        <label className="block font-medium text-sm text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          className="appearance-none w-full px-4 py-2 rounded-xl border border-gray-300 bg-white text-black shadow-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary transition"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        >
          <option value="">Select {label}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Chevron Icon */}
        <div
          className={`absolute top-1/2 right-3 transform -translate-y-1/2 pointer-events-none transition-transform duration-300 ${
            isFocused ? "rotate-180" : ""
          }`}
        >
          <BsChevronDown className="text-gray-500" size={18} />
        </div>
      </div>
    </div>
  );
}
