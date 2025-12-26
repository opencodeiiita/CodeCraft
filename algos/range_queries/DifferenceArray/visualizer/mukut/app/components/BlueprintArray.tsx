import React from "react";

interface BlueprintArrayProps {
  title: string;
  data: number[];
  activeIndex?: number | null;
  highlightColor?: string;
  label?: string;
  showIndex?: boolean;
}

export const BlueprintArray: React.FC<BlueprintArrayProps> = ({
  title,
  data,
  activeIndex,
  highlightColor = "var(--cyan-primary)",
  label,
  showIndex = true,
}) => {
  return (
    <div className="technical-border bg-slate-900/40 backdrop-blur-md p-6 rounded-sm border-slate-800 shadow-2xl">
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

      <div className="flex flex-wrap gap-4 justify-center py-4">
        {data.map((val, idx) => (
          <div key={idx} className="relative group">
            <div
              className={`
                w-16 h-16 flex flex-col items-center justify-center border transition-all duration-300
                ${
                  activeIndex === idx
                    ? "bg-cyan-500/20 border-cyan-400 shadow-[0_0_15px_rgba(0,242,255,0.3)] scale-105"
                    : "bg-slate-950/60 border-slate-800 group-hover:border-slate-600"
                }
              `}
              style={activeIndex === idx ? { borderColor: highlightColor } : {}}
            >
              <span
                className={`text-xl font-bold font-mono ${
                  activeIndex === idx ? "text-cyan-300" : "text-slate-400"
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
            {activeIndex === idx && (
              <div className="absolute -inset-2 border border-cyan-500/20 pointer-events-none animate-pulse-cyan" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
