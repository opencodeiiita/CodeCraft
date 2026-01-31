"use client";

import React, { useState } from "react";
import { Play, RotateCcw, Plus, Info, Zap, History as HistoryIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; 

const ANIMATION_SPEED = 0.8; 

interface SubStep {
  idx: number;
  op: string;
  amount: number;
  description: string;
}

interface DetailedHistory {
  range: string;
  val: number;
  steps: SubStep[];
}

export default function DifferenceArrayVisualizer() {
  const [inputStr, setInputStr] = useState("10,20,30,40,50");
  const [diffArray, setDiffArray] = useState<number[]>([]);
  const [finalArr, setFinalArr] = useState<number[]>([]);
  const [history, setHistory] = useState<DetailedHistory[]>([]);
  const [updateCount, setUpdateCount] = useState(0); 
  
  const [updateL, setUpdateL] = useState(1);
  const [updateR, setUpdateR] = useState(3);
  const [updateX, setUpdateX] = useState(10);

  const [isAnimating, setIsAnimating] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [secondaryIdx, setSecondaryIdx] = useState<number | null>(null);
  const [status, setStatus] = useState("Step 1: Initialize the array.");

  const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const animateInit = async () => {
    if (isAnimating) return;
    const nums = inputStr.split(",").map((v) => parseInt(v.trim()) || 0);
    if (nums.length === 0) return;

    setIsAnimating(true);
    setHistory([]); 
    setUpdateCount(0);
    setFinalArr(new Array(nums.length).fill(0));
    const newDiff = new Array(nums.length).fill(0);
    setDiffArray([...newDiff]);

    for (let i = 0; i < nums.length; i++) {
      setActiveIdx(i);
      const val = i === 0 ? nums[0] : nums[i] - nums[i - 1];
      newDiff[i] = val;
      setDiffArray([...newDiff]);
      setStatus(`D[${i}] = ${i === 0 ? "A[0]" : `A[${i}] - A[${i-1}]`} = ${val}`);
      await sleep(ANIMATION_SPEED * 800);
    }
    setActiveIdx(null);
    setIsAnimating(false);
    setStatus("Initialized. Ready for updates.");
  };

  const handleUpdate = async () => {
    if (isAnimating || diffArray.length === 0) return;
    const n = diffArray.length;
    const rPlusOne = updateR + 1;
    
    if (updateL > updateR) {
        setStatus(`Blocked: Invalid Range [${updateL}, ${updateR}]. L cannot be greater than R.`);
        return;
    }
    
    if (updateL < 0 || updateR >= n || rPlusOne >= n) {
        setStatus(`Blocked: R+1 (${rPlusOne}) is out of bounds for size ${n}.`);
        return;
    }

    setIsAnimating(true);
    const nextDiff = [...diffArray];
    const subSteps: SubStep[] = [];

    setActiveIdx(updateL);
    setStatus(`Step 1: D[${updateL}] += ${updateX}`);
    await sleep(ANIMATION_SPEED * 1000);
    nextDiff[updateL] += updateX;
    setDiffArray([...nextDiff]);
    subSteps.push({ idx: updateL, op: "+", amount: updateX, description: "Start of Range" });
    await sleep(ANIMATION_SPEED * 1000);

    setActiveIdx(null);
    setSecondaryIdx(rPlusOne);
    setStatus(`Step 2: D[${rPlusOne}] -= ${updateX}`);
    await sleep(ANIMATION_SPEED * 1000);
    nextDiff[rPlusOne] -= updateX;
    setDiffArray([...nextDiff]);
    subSteps.push({ idx: rPlusOne, op: "-", amount: updateX, description: "End of Range + 1" });
    await sleep(ANIMATION_SPEED * 1000);

    setHistory(prev => [{ range: `[${updateL}, ${updateR}]`, val: updateX, steps: subSteps }, ...prev]);
    setUpdateCount(prev => prev + 1);
    setActiveIdx(null);
    setSecondaryIdx(null);
    setIsAnimating(false);
    setStatus(`Range update complete.`);
  };

  const buildFinal = async () => {
    if (isAnimating || diffArray.length === 0) return;
    setIsAnimating(true);
    const n = diffArray.length;
    const build = new Array(n).fill(0);
    let runningSum = 0;

    for (let i = 0; i < n; i++) {
      setActiveIdx(i);
      runningSum += diffArray[i];
      build[i] = runningSum;
      setFinalArr([...build]);
      setStatus(`A[${i}] = Running Sum (${runningSum})`);
      await sleep(ANIMATION_SPEED * 1000);
    }
    setActiveIdx(null);
    setIsAnimating(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-slate-950 text-slate-100 rounded-2xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <Zap className="text-blue-400" size={24} />
          <h1 className="text-2xl font-bold tracking-tight uppercase">Difference Array Visualizer</h1>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 rounded-full border border-slate-800">
          <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">Updates: {updateCount}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 shadow-inner">
            <label className="text-[10px] font-black text-slate-500 uppercase block mb-2 tracking-widest">1. Set Custom Values</label>
            <div className="flex gap-2">
              <input type="text" value={inputStr} onChange={(e) => setInputStr(e.target.value)} className="flex-1 bg-black border border-slate-700 rounded-lg px-4 py-2 text-emerald-400 font-mono outline-none" />
              <button onClick={animateInit} disabled={isAnimating} className="bg-emerald-600 hover:bg-emerald-500 p-3 rounded-lg transition-all"><RotateCcw size={20} /></button>
            </div>
          </div>

          <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 shadow-inner">
            <label className="text-[10px] font-black text-slate-500 uppercase block mb-2 tracking-widest">2. Update Range [L, R]</label>
            <div className="flex gap-2">
              <input type="number" value={updateL} onChange={e => setUpdateL(+e.target.value)} className="w-1/4 bg-black border border-slate-700 rounded-lg px-2 text-center" placeholder="L" />
              <input type="number" value={updateR} onChange={e => setUpdateR(+e.target.value)} className="w-1/4 bg-black border border-slate-700 rounded-lg px-2 text-center" placeholder="R" />
              <input type="number" value={updateX} onChange={e => setUpdateX(+e.target.value)} className="w-1/4 bg-black border border-slate-700 rounded-lg px-2 text-center text-blue-400 font-bold" placeholder="Val" />
              <button onClick={handleUpdate} disabled={isAnimating || diffArray.length === 0} className="flex-1 bg-blue-600 hover:bg-blue-500 rounded-lg font-bold disabled:opacity-50 transition-all uppercase text-xs">Apply</button>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 flex flex-col h-full max-h-[300px] lg:max-h-full overflow-hidden">
          <div className="flex items-center gap-2 text-slate-400 mb-4 border-b border-slate-800 pb-2">
            <HistoryIcon size={16} />
            <span className="text-xs font-black uppercase tracking-widest">Logic History</span>
          </div>
          <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
            <AnimatePresence>
              {history.map((h, i) => (
                <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} key={i} className="bg-black/60 border border-slate-800 p-3 rounded-lg overflow-hidden">
                  <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-2 uppercase border-b border-slate-800/50 pb-1">
                    <span>Range [{h.range}]</span>
                    <span className="text-blue-400">Val {h.val}</span>
                  </div>
                  <div className="space-y-1 mt-2">
                    {h.steps.map((s, si) => (
                      <div key={si} className="flex justify-between text-[11px] font-mono">
                        <span className="text-slate-500">{s.description}</span>
                        <span className={s.op === '+' ? 'text-emerald-500' : 'text-red-500'}>D[{s.idx}] {s.op}{s.amount}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {history.length === 0 && <p className="text-slate-600 text-[10px] italic text-center py-4">Waiting for updates...</p>}
          </div>
        </div>
      </div>

      <div className="bg-blue-900/10 border border-blue-800/40 p-4 rounded-xl mb-12 flex items-start gap-4 shadow-inner">
         <Info size={18} className="text-blue-400 shrink-0 mt-0.5" />
         <p className="text-sm font-medium text-blue-200 leading-relaxed italic tracking-wide">{status}</p>
      </div>

      <div className="space-y-16 py-4">
        <ArrayRow title="Difference Array (D)" data={diffArray} active={activeIdx} secondary={secondaryIdx} isDiff={true} />
        
        <div className="flex justify-center">
          <button onClick={buildFinal} disabled={isAnimating || diffArray.length === 0} className="group bg-indigo-600 hover:bg-indigo-500 px-12 py-4 rounded-full font-bold shadow-2xl transition-all disabled:opacity-30 active:scale-95 flex items-center gap-3 border border-indigo-400/30">
            <Play size={20} className="group-hover:scale-110 transition-transform" /> 3. Build Prefix Sum
          </button>
        </div>

        <ArrayRow title="Final Reconstructed Array (A)" data={finalArr} active={activeIdx} highlightColor="border-emerald-500 bg-emerald-500/20" />
      </div>
    </div>
  );
}

function ArrayRow({ title, data, active, secondary, isDiff, highlightColor = "border-blue-500 bg-blue-500/20" }: any) {
  return (
    <div>
      <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">{title}</h3>
      <div className="flex flex-wrap gap-4">
        {data.map((val: number, i: number) => {
          const isActive = active === i;
          const isSecondary = secondary === i;
 
          return (
            <div key={i} className="flex flex-col items-center gap-2">
              <motion.div 
                animate={{ 
                  scale: isActive || isSecondary ? 1.15 : 1,
                  borderColor: isActive ? "#3b82f6" : isSecondary ? "#ef4444" : "#1e293b",
                  backgroundColor: isActive ? "rgba(59, 130, 246, 0.15)" : isSecondary ? "rgba(239, 68, 68, 0.15)" : "rgba(15, 23, 42, 1)",
                  y: isActive || isSecondary ? -5 : 0
                }}
                transition={{ duration: 0.4 }}
                className={`w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-2xl border-2 font-mono text-lg transition-shadow shadow-lg ${isActive || isSecondary ? 'z-10' : 'z-0'}`}
              >
                {isDiff && val > 0 ? `+${val}` : val}
              </motion.div>
              <span className={`text-[9px] font-black uppercase tracking-tighter transition-colors ${isActive ? 'text-blue-400' : isSecondary ? 'text-red-400' : 'text-slate-600'}`}>
                {isActive && isDiff ? 'D[L]' : isSecondary && isDiff ? 'D[R+1]' : `IDX ${i}`}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}