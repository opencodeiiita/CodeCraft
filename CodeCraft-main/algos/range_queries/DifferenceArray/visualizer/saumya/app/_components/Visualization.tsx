import React from "react";
import { Play, CheckCircle2 } from "lucide-react";
import { ArrayGrid } from "./ArrayGrid";
import { Update } from "../types";

type VisualizationProps = {
  diffArray: number[];
  finalArray: number[];
  updates: Update[];
  isComputing: boolean;
  computeIndex: number;
  onStartCompute: () => void;
};

export const Visualization: React.FC<VisualizationProps> = ({
  diffArray,
  finalArray,
  updates,
  isComputing,
  computeIndex,
  onStartCompute,
}) => {
  const size = finalArray.length;

  const getDiffCellStyle = (idx: number) => {
    const isStart = updates.some((u) => u.l === idx);
    const isEndNext = updates.some((u) => u.r + 1 === idx);

    let bg = "";
    let border = "";
    let label = "";
    let labelColor = "";

    if (isStart && isEndNext) {
      bg = "bg-purple-100 dark:bg-purple-500/20"; 
      border = "border-purple-300 dark:border-purple-500/50";
      label = "L & R+1"; 
      labelColor = "text-purple-600 dark:text-purple-300";
    } 
    else if (isStart) {

      bg = "bg-emerald-100 dark:bg-emerald-500/20"; 
      border = "border-emerald-300 dark:border-emerald-500/50";
      label = "L"; 
      labelColor = "text-emerald-600 dark:text-emerald-300";
    } 
    else if (isEndNext) {
      // End (R+1)
      bg = "bg-pink-100 dark:bg-pink-500/20"; 
      border = "border-pink-300 dark:border-pink-500/50";
      label = "R+1"; 
      labelColor = "text-pink-600 dark:text-pink-300";
    }

    return { bg, border, label, labelColor };
  };

  const getFinalCellStyle = (idx: number) => {
    const isActive = idx === computeIndex;
    const isComputed = idx < computeIndex;
    const isFinished = computeIndex >= size;

    if (isActive) {
      return { 
        bg: "bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/40 scale-110 z-10", 
        border: "border-transparent ring-2 ring-purple-200 dark:ring-purple-900", 
        text: "text-white" 
      };
    }
    if (isComputed || isFinished) {
      return { 
        bg: "bg-indigo-50 dark:bg-indigo-900/20", 
        border: "border-indigo-200 dark:border-indigo-500/30", 
        text: "text-indigo-900 dark:text-indigo-200" 
      };
    }
    return { 
      bg: "bg-gray-50 dark:bg-white/5", 
      border: "border-gray-200 dark:border-white/5", 
      text: "text-gray-300 dark:text-gray-600" 
    };
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500">

      <section>
        <ArrayGrid 
            data={diffArray} 
            title="1. Difference Array (D)" 
            subtitle="Size: N + 1"
            getCellStyle={getDiffCellStyle}
        />
      </section>
      
      <div className="flex justify-center my-6 relative">
        <div className="absolute top-1/2 left-0 w-full h-px bg-linear-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent -z-10" />
        
        <button
          onClick={onStartCompute}
          disabled={isComputing || updates.length === 0}
          className={`
            px-8 py-3 rounded-full font-bold shadow-xl flex items-center gap-3 transition-all duration-300
            ${isComputing || updates.length === 0
               ? "bg-gray-200 dark:bg-slate-800 text-gray-400 dark:text-slate-500 cursor-not-allowed"
               : "bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white hover:scale-105 hover:shadow-purple-500/25"
            }
          `}
        >
          {isComputing ? (
             <>Computing <span className="animate-pulse">...</span></>
          ) : (
             <>Compute Prefix Sums <Play size={18} fill="currentColor" /></>
          )} 
        </button>
      </div>

      <section className="bg-white/50 dark:bg-white/5 p-6 md:p-8 rounded-3xl border border-gray-200 dark:border-white/10 backdrop-blur-sm relative overflow-hidden">
        
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />

        <ArrayGrid 
            data={finalArray.map((v, i) => (i < computeIndex || computeIndex >= size) ? v : 0)} 
            title="2. Final Array (Prefix Sum)" 
            subtitle="A[i] = A[i-1] + D[i]"
            getCellStyle={getFinalCellStyle}
        />
        
        <div className="mt-8 flex justify-center min-h-12">
            {isComputing && computeIndex >= 0 && computeIndex < size ? (
                <div className="
                   inline-flex items-center gap-3 px-6 py-2 rounded-xl shadow-lg border 
                   bg-white dark:bg-[#0f111a] border-purple-100 dark:border-purple-500/30
                   animate-in slide-in-from-bottom-2 duration-300
                ">
                   <span className="text-sm font-mono text-gray-500 dark:text-gray-400">
                     A[{computeIndex}] = 
                   </span>
                   <div className="flex items-center gap-2 font-mono text-sm">
                      <span className="text-indigo-600 dark:text-indigo-400 font-bold">
                        {computeIndex > 0 ? finalArray[computeIndex-1] : 0}
                      </span>
                      <span className="text-gray-400">+</span>
                      <span className="text-pink-600 dark:text-pink-400 font-bold">
                        {diffArray[computeIndex]}
                      </span>
                      <span className="text-gray-400">=</span>
                      <span className="bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-extrabold text-lg">
                        {finalArray[computeIndex]}
                      </span>
                   </div>
                </div>
            ) : computeIndex >= size ? (
                <span className="
                  text-green-600 dark:text-green-400 font-bold flex items-center justify-center gap-2 
                  bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-full border border-green-200 dark:border-green-500/20
                ">
                    <CheckCircle2 size={18} />
                    Computation Complete!
                </span>
            ) : (
                <span className="text-gray-400 dark:text-slate-500 text-sm italic">
                  Waiting to start computation...
                </span>
            )}
        </div>
      </section>
    </div>
  );
};