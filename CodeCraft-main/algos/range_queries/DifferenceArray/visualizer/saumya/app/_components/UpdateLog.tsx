import React from "react";
import { Trash2, RotateCcw, AlertCircle } from "lucide-react";
import { Update } from "../types";

type UpdateLogProps = {
  updates: Update[];
  onRemove: (id: number) => void;
  onReset: () => void;
  disabled: boolean;
};

export const UpdateLog: React.FC<UpdateLogProps> = ({
  updates,
  onRemove,
  onReset,
  disabled,
}) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4 px-1 shrink-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
          Pending Operations
        </h2>
        
        {updates.length > 0 && (
          <button
            onClick={onReset}
            disabled={disabled}
            className="text-xs font-medium text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 flex items-center gap-1.5 px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RotateCcw size={12} /> Reset
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto pr-2 max-h-87.5 custom-scrollbar">
        {updates.length === 0 ? (
          <div className="h-full min-h-37.5 flex flex-col gap-3 items-center justify-center text-slate-400 dark:text-slate-500 text-sm border-2 border-dashed border-slate-200 dark:border-white/10 rounded-xl bg-slate-50/50 dark:bg-white/5">
            <AlertCircle className="w-6 h-6 opacity-50" />
            <span>No updates added yet.</span>
          </div>
        ) : (
          <div className="space-y-3 pb-2">
            {updates.map((u, idx) => (
              <div
                key={u.id}
                className={`
                  group relative flex items-center justify-between 
                  p-3 rounded-xl border transition-all duration-200
                  ${disabled ? "opacity-50 grayscale" : ""}
                  bg-white dark:bg-[#1a1b26] 
                  border-gray-200 dark:border-white/10
                  hover:border-purple-300 dark:hover:border-purple-500/50
                  shadow-sm dark:shadow-none
                `}
              >
                <div className="flex flex-col gap-1.5 w-full">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-700 dark:text-slate-200 text-sm flex items-center gap-2">
                      <span className="w-5 h-5 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-500">
                        {idx + 1}
                      </span>
                      Range <span className="font-mono text-purple-600 dark:text-purple-400">[{u.l}, {u.r}]</span>
                    </span>
                    
                    <span className="font-bold text-slate-800 dark:text-white bg-slate-100 dark:bg-white/10 px-2 py-0.5 rounded text-xs">
                      {u.val > 0 ? "+" : ""}{u.val}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 text-[10px] font-mono mt-1 border-t border-gray-100 dark:border-white/5 pt-2">
                     <span className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 px-1.5 py-0.5 rounded">
                        D[{u.l}] += {u.val}
                     </span>
                     <span className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 px-1.5 py-0.5 rounded">
                        D[{u.r + 1}] -= {u.val}
                     </span>
                  </div>
                </div>
                
                {!disabled && (
                  <button
                    onClick={() => onRemove(u.id)}
                    className="absolute -top-2 -right-2 bg-white dark:bg-slate-800 text-slate-400 hover:text-red-500 shadow-sm border border-gray-200 dark:border-slate-700 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100 z-10"
                    title="Remove Update"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};