import React from "react";

interface BlueprintArrayProps {
  title: string;
  data: number[];
  activeIndex?: number | null;
  highlightColor?: string;
  label?: string;
  showIndex?: boolean;
  onSelectionStart?: (idx: number) => void;
  onSelectionMove?: (idx: number) => void;
  selectionRange?: { l: number; r: number } | null;
}

export const BlueprintArray: React.FC<BlueprintArrayProps> = ({
  title,
  data,
  activeIndex,
  highlightColor = "var(--cyan-primary)",
  label,
  showIndex = true,
  onSelectionStart,
  onSelectionMove,
  selectionRange,
}) => {
  return (
    <div className="technical-border bg-slate-900/40 backdrop-blur-md p-6 rounded-sm border-slate-800 shadow-2xl overflow-hidden">
      <div className="flex justify-between items-center mb-6 border-l-2 border-cyan-500/50 pl-3">
        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400/80">
            {title}
          </h3>
          {label && (
            <p className="text-[10px] font-mono text-slate-500 mt-1">
              MODULE_ID: {label}
            </p>
          )}
        </div>
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
          <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
        </div>
      </div>

      <div
        className="flex flex-wrap gap-4 justify-center py-4"
        onMouseLeave={() => onSelectionMove?.(-1)}
      >
        {data.map((val, idx) => {
          const isSelected =
            selectionRange &&
            idx >= selectionRange.l &&
            idx <= selectionRange.r;

          return (
            <div
              key={idx}
              className="relative group cursor-crosshair"
              onMouseDown={() => onSelectionStart?.(idx)}
              onMouseEnter={() => onSelectionMove?.(idx)}
            >
              <div
                className={`
                  w-16 h-16 flex flex-col items-center justify-center border transition-all duration-300
                  ${
                    activeIndex === idx
                      ? "bg-cyan-500/20 border-cyan-400 shadow-[0_0_15px_rgba(0,242,255,0.3)] scale-105"
                      : isSelected
                      ? "bg-pink-500/10 border-pink-500/50 shadow-[0_0_10px_rgba(236,72,153,0.2)]"
                      : "bg-slate-950/60 border-slate-800 group-hover:border-slate-600"
                  }
                `}
                style={
                  activeIndex === idx ? { borderColor: highlightColor } : {}
                }
              >
                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
                  <div className="w-full h-full bg-[radial-gradient(circle_at_center,var(--cyan-primary)_1px,transparent_1px)] bg-[size:4px_4px]" />
                </div>

                <span
                  className={`text-xl font-bold font-mono relative z-10 ${
                    activeIndex === idx
                      ? "text-cyan-300"
                      : isSelected
                      ? "text-pink-400"
                      : "text-slate-400"
                  }`}
                >
                  {val}
                </span>

                {showIndex && (
                  <div className="absolute -top-3 left-0 right-0 flex justify-center">
                    <span className="text-[9px] font-mono bg-slate-950 px-1 text-slate-600 border border-slate-800 uppercase">
                      idx_{idx.toString().padStart(2, "0")}
                    </span>
                  </div>
                )}
              </div>

              {/* Technical decoration */}
              {(activeIndex === idx || isSelected) && (
                <div
                  className={`absolute -inset-2 border ${
                    isSelected ? "border-pink-500/20" : "border-cyan-500/20"
                  } pointer-events-none ${
                    isSelected ? "" : "animate-pulse-cyan"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
