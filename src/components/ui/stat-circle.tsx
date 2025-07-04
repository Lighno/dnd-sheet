"use client";

import { Minus, Plus } from "lucide-react";
import type React from "react";
import { cn } from "~/lib/utils";

interface StatCircleProps {
  value: number;
  step?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  label?: string;
  sublabel?: string;
  readOnly?: boolean;
  className?: string;
  showControls?: boolean;
}

export default function StatCircle({
  value,
  step = 1,
  min = 0,
  max,
  onChange,
  label,
  sublabel,
  className = "",
  readOnly = false,
  showControls = true,
}: StatCircleProps) {
  const increment = () => {
    if (!max || value < max) {
      onChange?.(value + step);
    }
  };

  const decrement = () => {
    if (value > min) {
      onChange?.(value - step);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (readOnly) return;
    const newValue = Number.parseInt(e.target.value) || 0;
    if (newValue >= min && (!max || newValue <= max)) {
      onChange?.(newValue);
    }
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Main circle */}
      <div className="group relative">
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-slate-200 bg-white shadow-md transition-transform hover:scale-102 dark:border-slate-700 dark:bg-slate-800">
          {/* Background effect */}
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.3),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(100,116,139,0.2),transparent_70%)]" />

          {/* Input */}
          <input
            type="number"
            value={value}
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
            disabled={readOnly}
            className="relative z-10 h-full w-full bg-transparent text-center text-2xl font-bold text-slate-800 transition-colors outline-none [-moz-appearance:textfield] hover:text-slate-600 focus:text-slate-600 dark:text-slate-200 dark:hover:text-slate-300 dark:focus:text-slate-300 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />

          {/* Control buttons */}
          {showControls && !readOnly && (
            <>
              <button
                type="button"
                onClick={decrement}
                disabled={value <= min}
                className="absolute -left-2 z-20 flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-600 opacity-0 shadow-sm transition-all group-hover:opacity-100 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
                aria-label="Decrease value"
              >
                <Minus className="h-3 w-3" />
              </button>
              <button
                type="button"
                onClick={increment}
                disabled={Boolean(max && value >= max)}
                className="absolute -right-2 z-20 flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-600 opacity-0 shadow-sm transition-all group-hover:opacity-100 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
                aria-label="Increase value"
              >
                <Plus className="h-3 w-3" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Labels */}
      {(label || sublabel) && (
        <div className="flex flex-col">
          {label && (
            <span className="text-base font-semibold text-slate-900 dark:text-slate-100">
              {label}
            </span>
          )}
          {sublabel && (
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {sublabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
