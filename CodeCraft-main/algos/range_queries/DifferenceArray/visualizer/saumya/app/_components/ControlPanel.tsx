import React, { useState, useEffect } from "react";
import { Plus, Settings2 } from "lucide-react";

type ControlPanelProps = {
  size: number;
  setSize: (n: number) => void;
  onAddUpdate: (l: number, r: number, val: number) => void;
  disabled: boolean;
};

export const ControlPanel: React.FC<ControlPanelProps> = ({
  size,
  setSize,
  onAddUpdate,
  disabled,
}) => {
  const [l, setL] = useState<string | number>(0);
  const [r, setR] = useState<string | number>(4);
  const [val, setVal] = useState<string | number>(5);
  
  const [localSize, setLocalSize] = useState<string | number>(size);

  useEffect(() => {
    setLocalSize(size);
  }, [size]);

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (value === "") {
      setLocalSize("");
      return;
    }

    if (!/^\d*$/.test(value)) {
        return; 
    }

    setLocalSize(value);
    
    const num = Number(value);
    if (!isNaN(num) && num > 0) {
      setSize(num);
    }
  };

  const handleChange = (setter: React.Dispatch<React.SetStateAction<string | number>>) => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
  };

  const handleApply = () => {
    onAddUpdate(Number(l), Number(r), Number(val));
  };

  const inputClass = `
    w-full px-3 py-2.5 
    bg-gray-50 dark:bg-[#0B0E14] 
    border border-gray-200 dark:border-white/10 
    rounded-xl 
    text-slate-800 dark:text-slate-100 
    placeholder:text-gray-400 
    focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 focus:outline-none 
    transition-all duration-200
  `;

  const labelClass = "block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider";

  return (
    <div className="h-full flex flex-col gap-6">
      <div>
        <label className={labelClass}>
          Array Size (N)
        </label>
        <div className="relative">
          <Settings2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text" 
            inputMode="numeric"
            value={localSize}
            onChange={handleSizeChange}
            disabled={disabled}
            className={`${inputClass} pl-10`}
            placeholder="Size" 
          />
        </div>
      </div>

      <div className="w-full h-px bg-gray-200 dark:bg-white/5" />

      <div>
        <label className={labelClass}>
          Add Range Update
        </label>
        
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div>
            <span className="text-[10px] text-gray-400 dark:text-gray-500 mb-1 block">Start (L)</span>
            <input
              type="number"
              value={l}
              onChange={handleChange(setL)}
              disabled={disabled}
              className={inputClass}
              placeholder="0"
            />
          </div>
          <div>
            <span className="text-[10px] text-gray-400 dark:text-gray-500 mb-1 block">End (R)</span>
            <input
              type="number"
              value={r}
              onChange={handleChange(setR)}
              disabled={disabled}
              className={inputClass}
              placeholder="4"
            />
          </div>
          <div>
            <span className="text-[10px] text-gray-400 dark:text-gray-500 mb-1 block">Value (X)</span>
            <input
              type="number"
              value={val}
              onChange={handleChange(setVal)}
              disabled={disabled}
              className={inputClass}
              placeholder="5"
            />
          </div>
        </div>

        <button
          onClick={handleApply}
          disabled={disabled}
          className={`
            w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 
            transition-all duration-300 shadow-lg shadow-purple-500/20
            ${disabled 
              ? "bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-slate-600 cursor-not-allowed" 
              : "bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white hover:shadow-purple-500/40 active:scale-[0.98]"
            }
          `}
        >
          <Plus size={18} /> 
          Apply Operation
        </button>
      </div>
    </div>
  );
};