"use client";

import { Minus, Plus } from "lucide-react";
import type React from "react";

interface DndInputProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  label?: string;
  readOnly?: boolean;
  className?: string;
}

export default function AbilityInput({
  value,
  min = 0,
  max = 20,
  onChange,
  label,
  className = "",
  readOnly = false,
}: DndInputProps) {
  const increment = () => {
    if (value < max) {
      const newValue = value + 1;
      onChange(newValue);
    }
  };

  const decrement = () => {
    if (value > min) {
      const newValue = value - 1;
      onChange(newValue);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (readOnly) return;
    const newValue = Number.parseInt(e.target.value) || 0;
    if (newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {label && (
        <label className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <div className="relative flex items-center justify-center">
        {/* Minus button */}
        <button
          type="button"
          onClick={decrement}
          disabled={value <= min || readOnly}
          className="absolute left-0 flex h-8 w-8 -translate-x-8/10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-500 transition-colors hover:bg-gray-100 disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 z-1"
          aria-label="Decrease value"
        >
          <Minus className="h-4 w-4" />
        </button>

        {/* Main circular input */}
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-amber-800 bg-amber-50 shadow-md dark:border-amber-700 dark:bg-gray-800 z-0">
          <input
            type="number"
            value={value}
            onChange={handleInputChange}
            min={min}
            max={max}
            className="absolute inset-0 h-full w-full rounded-full bg-transparent text-center text-xl font-bold text-amber-900 outline-none [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none dark:text-amber-400"
          />
          <div className="absolute inset-0 rounded-full border border-amber-600/20 bg-gradient-to-b from-amber-100/50 to-transparent dark:from-amber-900/30 dark:to-transparent" />
        </div>

        {/* Plus button */}
        <button
          type="button"
          onClick={increment}
          disabled={value >= max || readOnly}
          className="absolute right-0 flex h-8 w-8 translate-x-8/10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-500 transition-colors hover:bg-gray-100 disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 z-1"
          aria-label="Increase value"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
