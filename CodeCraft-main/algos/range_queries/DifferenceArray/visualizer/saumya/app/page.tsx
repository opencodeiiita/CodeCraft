"use client";

import { useDiffArray } from "./hooks/useDiffArray";
import { ControlPanel } from "./_components/ControlPanel";
import { UpdateLog } from "./_components/UpdateLog";
import { Visualization } from "./_components/Visualization";

const DiffArrayPage = () => {
  const {
    size,
    setSize,
    updates,
    addUpdate,
    removeUpdate,
    diffArray,
    finalArray,
    startComputation,
    resetVisualizer,
    isComputing,
    computeIndex,
  } = useDiffArray();

  return (
    <div className="relative min-h-screen w-full transition-colors duration-300 font-sans selection:bg-pink-500/30 bg-gray-50 dark:bg-[#0B0E14] text-slate-800 dark:text-slate-200 overflow-x-hidden">
      
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-pink-500/20 blur-[120px]" />
        <div className="absolute top-[20%] right-[20%] w-[20%] h-[20%] rounded-full bg-indigo-500/20 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-6 lg:p-12">
        
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 border-b border-gray-200 dark:border-white/10 pb-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2">
              <span className="bg-clip-text text-transparent bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
                Difference Array
              </span>{" "}
              Visualizer
            </h1>
            <p className="text-gray-600 dark:text-slate-400 max-w-2xl text-lg mt-2 leading-relaxed">
              Master range updates with <code className="bg-gray-200 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm font-mono text-pink-600 dark:text-pink-400">O(1)</code> efficiency and linear reconstruction.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            <div className="group bg-white/70 dark:bg-[#151725]/80 backdrop-blur-xl border border-gray-200 dark:border-purple-500/20 rounded-2xl shadow-lg dark:shadow-purple-900/10 p-1 overflow-hidden transition-all hover:border-purple-400/50">
              <div className="p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-6 bg-pink-500 rounded-full" />
                  <h2 className="text-xl font-bold text-slate-800 dark:text-white">Configuration</h2>
                </div>
                <ControlPanel
                  size={size}
                  setSize={setSize}
                  onAddUpdate={addUpdate}
                  disabled={isComputing}
                />
              </div>
            </div>

            <div className="flex-1 bg-white/70 dark:bg-[#151725]/80 backdrop-blur-xl border border-gray-200 dark:border-purple-500/20 rounded-2xl shadow-lg dark:shadow-purple-900/10 p-1 overflow-hidden min-h-75">
              <div className="p-5 h-full flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-6 bg-purple-500 rounded-full" />
                  <h2 className="text-xl font-bold text-slate-800 dark:text-white">Operation Log</h2>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                  <UpdateLog
                    updates={updates}
                    onRemove={removeUpdate}
                    onReset={resetVisualizer}
                    disabled={isComputing}
                  />
                </div>
              </div>
            </div>

          </div>

          <div className="lg:col-span-8">
            <div className="h-full bg-white dark:bg-[#0f111a] border border-gray-200 dark:border-white/5 rounded-2xl shadow-2xl dark:shadow-black/50 overflow-hidden flex flex-col">
              
              <div className="bg-gray-100 dark:bg-[#1a1b26] border-b border-gray-200 dark:border-white/5 p-4 flex items-center justify-between">
                 <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                    <div className="w-3 h-3 rounded-full bg-green-400/80" />
                 </div>
                 <div className="text-xs font-mono text-gray-400 uppercase tracking-widest">
                    Live Visualizer
                 </div>
              </div>

              <div className="p-6 md:p-8 flex-1 bg-white dark:bg-linear-to-br dark:from-[#0f111a] dark:to-[#131520]">
                 <Visualization 
                    diffArray={diffArray}
                    finalArray={finalArray}
                    updates={updates}
                    isComputing={isComputing}
                    computeIndex={computeIndex}
                    onStartCompute={startComputation}
                 />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DiffArrayPage;