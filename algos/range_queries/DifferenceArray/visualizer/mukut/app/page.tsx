"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useDifferenceArray } from "./hooks/useDifferenceArray";
import { BlueprintArray } from "./components/BlueprintArray";
import { ControlPanel } from "./components/ControlPanel";
import { LogoIcon, TerminalIcon, RefreshIcon } from "./components/Icons";

export default function DiffArrayVisualizer() {
  const {
    size,
    setSize,
    updates,
    addUpdate,
    removeUpdate,
    diffArray,
    finalArray,
    isAnimating,
    setIsAnimating,
    activeIndex,
    setActiveIndex,
    currentStep,
    setCurrentStep,
    resetAll,
    operationsSaved,
    stepForward,
    stepBackward,
    baseArray,
    setBaseArray,
    isNaiveMode,
    setIsNaiveMode,
    selectionRange,
    setSelectionRange,
  } = useDifferenceArray();

  const [explanation, setExplanation] = useState(
    "Terminal Ready. System Online."
  );

  const [customInput, setCustomInput] = useState(baseArray.join(","));
  const [dragStartIdx, setDragStartIdx] = useState<number | null>(null);

  const handleSelectionStart = (idx: number) => {
    if (idx < 0) return;
    setDragStartIdx(idx);
    setSelectionRange({ l: idx, r: idx });
  };

  const handleSelectionMove = (idx: number) => {
    if (dragStartIdx === null) return;
    if (idx < 0) {
      setDragStartIdx(null);
      return;
    }
    const l = Math.min(dragStartIdx, idx);
    const r = Math.max(dragStartIdx, idx);
    setSelectionRange({ l, r });
  };

  const handleSelectionEnd = () => {
    setDragStartIdx(null);
  };

  const handleInit = () => {
    const parts = customInput.split(",").map((p) => parseInt(p.trim()));
    if (parts.length === size && parts.every((p) => !isNaN(p))) {
      setBaseArray(parts);
    } else {
      alert(`Please enter exactly ${size} numbers separated by commas!`);
    }
  };

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const runAnimation = async () => {
    if (isAnimating || updates.length === 0) return;
    setIsAnimating(true);
    setCurrentStep(-1);

    setExplanation("Starting Reconstruction Protocol... building final state.");
    await sleep(800);

    for (let i = 0; i < size; i++) {
      setActiveIndex(i);
      setCurrentStep(i);

      const diffVal = diffArray[i];
      const prevFinal = i > 0 ? finalArray[i - 1] : 0;

      setExplanation(
        `PRE_SUM[${i}] = PRE_SUM[${
          i - 1 < 0 ? "BASE" : i - 1
        }] + DIFF[${i}] => ${prevFinal} + (${diffVal}) = ${finalArray[i]}`
      );

      await sleep(1000);
    }

    setExplanation("Done! Final State Reconstructed and Optimized.");
    setActiveIndex(null);
    setIsAnimating(false);
  };

  const [naiveArray, setNaiveArray] = useState<number[]>([]);
  const [isNaiveAnimating, setIsNaiveAnimating] = useState(false);

  const runNaiveAnimation = async (l: number, r: number, x: number) => {
    setIsNaiveAnimating(true);
    setExplanation(
      `NAIVE_PROTOCOL: Starting range update [${l}, ${r}] with value ${x}...`
    );
    await sleep(500);

    const tempArray = [...(naiveArray.length > 0 ? naiveArray : baseArray)];
    for (let i = l; i <= r; i++) {
      setActiveIndex(i);
      tempArray[i] += x;
      setNaiveArray([...tempArray]);
      setExplanation(
        `INDEX_TOUCHED[${i}]: Increasing value by ${x}. Complexity: O(1) per index.`
      );
      await sleep(400);
    }

    setExplanation(
      `UPDATE_COMPLETE: Touched ${r - l + 1} indices total. Complexity: O(N).`
    );
    setActiveIndex(null);
    setIsNaiveAnimating(false);
  };

  useEffect(() => {
    setNaiveArray([...baseArray]);
  }, [baseArray]);

  useEffect(() => {
    window.addEventListener("mouseup", handleSelectionEnd);
    return () => window.removeEventListener("mouseup", handleSelectionEnd);
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-mono selection:bg-cyan-500/30 overflow-x-hidden relative">
      {/* Scanner Line */}
      <div className="scanner-line" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:px-12">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b border-cyan-500/10 pb-8">
          <div className="flex items-start gap-6">
            <div className="bg-cyan-500/10 p-3 border border-cyan-500/20 rounded-xl hidden md:block">
              <LogoIcon className="w-10 h-10 text-cyan-400" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-cyan-500 text-slate-950 text-[10px] font-black px-2 py-0.5 uppercase tracking-tighter">
                  OpenCode &apos;24
                </div>
                <div className="text-[10px] text-cyan-500/50 font-bold uppercase tracking-widest">
                  Custom Build v1.0
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-2 text-white italic">
                Diff Array{" "}
                <span className="text-cyan-400 not-italic">Visualizer</span>
              </h1>
              <p className="text-slate-500 max-w-2xl text-sm font-bold uppercase tracking-wide">
                High-performance range update visualization.
              </p>
            </div>
          </div>
          <div className="mt-4 md:mt-0 px-5 py-3 border border-cyan-500/20 bg-cyan-500/5 rounded-2xl flex items-center gap-4">
            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
            <div className="flex flex-col">
              <span className="text-[8px] text-cyan-500/50 font-black uppercase tracking-widest">
                Operator
              </span>
              <span className="text-xs font-black tracking-tight text-cyan-400 uppercase">
                MUKUT KUMAR
              </span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls Section */}
          <aside className="lg:col-span-4 lg:sticky lg:top-8 h-fit">
            <ControlPanel
              size={size}
              setSize={setSize}
              updates={updates}
              addUpdate={(l, r, x) => {
                const success = addUpdate(l, r, x);
                if (success) {
                  setSelectionRange(null);
                  if (isNaiveMode) {
                    runNaiveAnimation(l, r, x);
                  }
                }
                return success;
              }}
              removeUpdate={removeUpdate}
              resetAll={() => {
                resetAll();
                setNaiveArray([...baseArray]);
              }}
              isAnimating={isAnimating || isNaiveAnimating}
              onAnimate={runAnimation}
              operationsSaved={operationsSaved}
              stepForward={stepForward}
              stepBackward={stepBackward}
              playbackIndex={currentStep}
              isNaiveMode={isNaiveMode}
              setIsNaiveMode={setIsNaiveMode}
              selectionRange={selectionRange}
            />

            <div className="mt-6 p-6 border border-slate-800 bg-slate-950/50">
              <h4 className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.2em] mb-4">
                Technical Specs
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between border-b border-slate-800 pb-1">
                  <span className="text-[9px] text-slate-500 uppercase">
                    Update Complexity
                  </span>
                  <span
                    className={`text-[9px] font-mono font-bold ${
                      isNaiveMode ? "text-pink-400" : "text-emerald-400"
                    }`}
                  >
                    {isNaiveMode ? "Θ(N) LINEAR" : "Θ(1) CONSTANT"}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1">
                  <span className="text-[9px] text-slate-500 uppercase">
                    Query Complexity
                  </span>
                  <span className="text-[9px] font-mono text-emerald-400 font-bold">
                    Θ(N) LINEAR
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[9px] text-slate-500 uppercase">
                    Memory Footprint
                  </span>
                  <span className="text-[9px] font-mono text-cyan-400 font-bold">
                    2 * N * sizeof(INT)
                  </span>
                </div>
              </div>
            </div>
          </aside>

          {/* Visualization Section */}
          <main className="lg:col-span-8 flex flex-col gap-8">
            <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="bg-slate-950 p-2 border border-slate-800 rounded-lg">
                  <TerminalIcon className="w-5 h-5 text-cyan-500" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-white italic tracking-tighter uppercase">
                    Prefix_Sum_Viz
                  </h2>
                  <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wide">
                    O(N) Reconstruct Protocol
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <input
                  type="text"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white w-full md:w-64 focus:border-cyan-500 outline-none transition-all font-mono text-sm shadow-inner"
                  placeholder="e.g. 4,2,5,7,8,9"
                />
                <button
                  onClick={handleInit}
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-4 py-2 rounded-lg text-xs font-black uppercase transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                >
                  INIT
                </button>
                <button
                  onClick={resetAll}
                  className="bg-slate-800/50 hover:bg-slate-700 text-cyan-400 border border-slate-700 p-2 rounded-lg transition-all group"
                  title="Reset Everything"
                >
                  <RefreshIcon className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                </button>
              </div>
            </div>

            <div className="space-y-8">
              <BlueprintArray
                title="Original Array [base]"
                label="INITIAL_STATE_VALUES"
                data={baseArray}
                highlightColor="var(--slate-500)"
              />

              {!isNaiveMode && (
                <BlueprintArray
                  title="Difference Buffer [diff]"
                  label="BUFFER_A_MARKERS"
                  data={diffArray}
                  activeIndex={activeIndex}
                />
              )}

              <BlueprintArray
                title={`Reconstructed State [${
                  isNaiveMode ? "naive" : "opti"
                }]`}
                label={
                  isNaiveMode
                    ? "O(N)_UNOPTIMIZED_BUFFER"
                    : "O(Q+N)_MASTER_BUFFER"
                }
                data={
                  isNaiveMode
                    ? naiveArray
                    : isAnimating
                    ? finalArray.map((v, i) =>
                        i <= (currentStep ?? -1) ? v : 0
                      )
                    : finalArray
                }
                activeIndex={activeIndex}
                highlightColor={
                  isNaiveMode ? "var(--pink-500)" : "var(--emerald-primary)"
                }
                onSelectionStart={handleSelectionStart}
                onSelectionMove={handleSelectionMove}
                selectionRange={selectionRange}
              />
            </div>

            <div className="bg-slate-950/80 border-l-2 border-cyan-500 p-8 rounded-none backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 opacity-5">
                <span className="text-6xl font-black">LOG</span>
              </div>
              <div className="flex items-start gap-6 relative z-10">
                <div className="w-10 h-10 border border-cyan-500/30 flex items-center justify-center shrink-0">
                  <div className="w-2 h-2 bg-cyan-500 animate-ping" />
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-cyan-500 mb-2 uppercase tracking-widest">
                    Step-by-step Explanation
                  </h4>
                  <p className="text-slate-200 text-lg leading-relaxed font-bold tracking-tight">
                    {explanation}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 border border-slate-800 bg-slate-950/40">
                <h5 className="text-[9px] font-black text-slate-600 mb-4 uppercase tracking-[0.2em]">
                  Signal Protocols
                </h5>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-[10px] text-cyan-400 font-bold">
                      diff[L] += X
                    </div>
                    <div className="text-[8px] text-slate-500 uppercase">
                      Rise Entry
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] text-pink-400 font-bold">
                      diff[R+1] -= X
                    </div>
                    <div className="text-[8px] text-slate-500 uppercase">
                      Fall Exit
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 border border-slate-800 bg-slate-950/40">
                <h5 className="text-[9px] font-black text-slate-600 mb-4 uppercase tracking-[0.2em]">
                  Runtime Optimization
                </h5>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-1 bg-cyan-500/20" />
                  <div>
                    <p className="text-2xl font-black text-white italic">
                      O(Q+N)
                    </p>
                    <p className="text-[8px] text-slate-500 uppercase font-bold">
                      Algorithmic Efficiency Class
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
