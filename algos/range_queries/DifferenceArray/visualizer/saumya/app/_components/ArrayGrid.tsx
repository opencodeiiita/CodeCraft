import React from "react";

type ArrayGridProps = {
  data: number[];
  title: string;
  subtitle?: string;
  getCellStyle?: (index: number) => { 
    bg?: string; 
    border?: string; 
    text?: string; 
    label?: string; 
    labelColor?: string;
  };
};

export const ArrayGrid: React.FC<ArrayGridProps> = ({ 
  data, 
  title, 
  subtitle, 
  getCellStyle 
}) => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-4">
        <h3 className="text-lg font-bold text-slate-700 dark:text-slate-100">
          {title}
        </h3>
        {subtitle && (
          <span className="text-xs font-mono px-2 py-1 rounded-md border 
            bg-purple-50 text-purple-700 border-purple-200 
            dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-500/30">
            {subtitle}
          </span>
        )}
      </div>

      <div className="flex overflow-x-auto pb-6 gap-3 px-1 custom-scrollbar">
        {data.map((val, idx) => {
          const customStyle = getCellStyle ? getCellStyle(idx) : {};
          
          const bgClass = customStyle.bg || "bg-white dark:bg-[#1a1b26]";
          const borderClass = customStyle.border || "border-gray-200 dark:border-white/10";
          const textClass = customStyle.text || "text-slate-700 dark:text-slate-200";

          const isGreen = customStyle.bg?.includes("green");
          const isPurple = customStyle.bg?.includes("purple") || customStyle.bg?.includes("pink");

          return (
            <div key={idx} className="flex flex-col items-center min-w-14 group relative">
              
              <div
                className={`
                  relative w-14 h-14 flex items-center justify-center 
                  border-2 rounded-xl text-xl font-bold shadow-sm 
                  transition-all duration-300 transform group-hover:-translate-y-1
                  backdrop-blur-sm
                  ${bgClass} ${borderClass} ${textClass}
                `}
              >
                {val}
                
                {isGreen && (
                   <div className="absolute inset-0 bg-green-500/30 blur-lg -z-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
                {isPurple && (
                   <div className="absolute inset-0 bg-purple-500/30 blur-lg -z-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </div>

              <span className="text-xs font-mono text-gray-400 dark:text-slate-500 mt-2">
                {idx}
              </span>
              
              <div className="h-4 mt-1 flex items-center justify-center">
                {customStyle.label && (
                  <span 
                    className={`
                      text-[10px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded
                      bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700
                      ${customStyle.labelColor || "text-slate-500 dark:text-slate-400"}
                      animate-in fade-in zoom-in duration-300
                    `}
                  >
                    {customStyle.label}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};