"use client";

import { Minus, Plus } from "lucide-react";
import type React from "react";
import { calculateModifier, cn } from "~/lib/utils";

interface AbilityScoreInputProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  label?: string;
  readOnly?: boolean;
  className?: string;
}

export default function AbilityScoreInput({
  value,
  min = 0,
  max = 20,
  onChange,
  label,
  className = "",
  readOnly = false,
}: AbilityScoreInputProps) {
  // Calculate ability modifier using D&D 5e formula
  const modifier = calculateModifier(value);
  const modifierDisplay = modifier >= 0 ? `+${modifier}` : `${modifier}`;

  const increment = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const decrement = () => {
    if (value > min) {
      onChange(value - 1);
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
    <div className={cn("flex flex-col items-center", className)}>
      {/* Label */}
      {label && (
        <span className="mb-1 text-sm font-semibold tracking-wider text-slate-700 uppercase dark:text-slate-300">
          {label}
        </span>
      )}

      {/* Main circle container */}
      <div className="group relative">
        {/* Outer decorative ring with runes
        <div
          className="animate-spin-slow absolute inset-0 rounded-full border-2 border-slate-300 dark:border-slate-600"
          style={{
            background: `conic-gradient(from 0deg,
                 transparent 0deg,
                 rgba(100, 116, 139, 0.1) 90deg,
                 transparent 180deg,
                 rgba(100, 116, 139, 0.1) 270deg,
                 transparent 360deg)`,
          }}
        /> */}

        {/* Main input circle */}
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-4 border-slate-700 bg-white shadow-lg transition-transform hover:scale-105 dark:border-slate-500 dark:bg-slate-800">
          {/* Background patterns */}
          {/* <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_120%,rgba(100,116,139,0.2),transparent_70%)]" />
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.3),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_-20%,rgba(100,116,139,0.3),transparent_70%)]" /> */}

          {/* Score input */}
          <input
            type="number"
            value={value.toString()}
            onChange={handleInputChange}
            onFocus={(e: React.FocusEvent<HTMLInputElement>) =>
              e.currentTarget.select()
            }
            onClick={(e: React.MouseEvent<HTMLInputElement>) =>
              e.currentTarget.select()
            }
            min={min}
            max={max}
            readOnly={readOnly}
            className="relative z-10 h-full w-full bg-transparent text-center text-4xl font-bold text-slate-900 transition-colors outline-none [-moz-appearance:_textfield] hover:text-slate-700 focus:text-slate-700 dark:text-slate-100 dark:hover:text-slate-300 dark:focus:text-slate-300 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />

          {/* Modifier display */}
          <div className="absolute -bottom-3 z-20 flex h-8 w-12 items-center justify-center rounded-full border-2 border-slate-600 bg-slate-700 text-sm font-bold text-slate-100 shadow-md transition-colors group-hover:bg-slate-600 dark:border-slate-400 dark:bg-slate-600 dark:group-hover:bg-slate-500">
            {modifierDisplay}
          </div>

          {/* Control buttons */}
          <button
            type="button"
            onClick={decrement}
            disabled={value <= min || readOnly}
            className="absolute cursor-pointer -left-3 z-20 flex h-8 w-8 items-center justify-center rounded-full border-2 border-slate-600 bg-slate-700 text-slate-100 opacity-0 shadow-md transition-all group-hover:opacity-100 hover:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-400 dark:bg-slate-600 dark:hover:bg-slate-500"
            aria-label="Decrease value"
          >
            <Minus className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={increment}
            disabled={value >= max || readOnly}
            className="absolute cursor-pointer -right-3 z-20 flex h-8 w-8 items-center justify-center rounded-full border-2 border-slate-600 bg-slate-700 text-slate-100 opacity-0 shadow-md transition-all group-hover:opacity-100 hover:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-400 dark:bg-slate-600 dark:hover:bg-slate-500"
            aria-label="Increase value"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
