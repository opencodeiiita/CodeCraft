import React, { useState } from "react";
import { Update } from "../hooks/useDifferenceArray";
import {
  SettingsIcon,
  PlusIcon,
  PlayIcon,
  PrevIcon,
  NextIcon,
  TrashIcon,
} from "./Icons";

interface ControlPanelProps {
  size: number;
  setSize: (size: number) => void;
  updates: Update[];
  addUpdate: (l: number, r: number, x: number) => boolean;
  removeUpdate: (id: string) => void;
  resetAll: () => void;
  isAnimating: boolean;
  onAnimate: () => void;
  operationsSaved: number;
  stepForward: () => void;
  stepBackward: () => void;
  playbackIndex: number;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  size,
  setSize,
  updates,
  addUpdate,
  removeUpdate,
  resetAll,
  isAnimating,
  onAnimate,
  operationsSaved,
  stepForward,
  stepBackward,
  playbackIndex,
}) => {
  const [newL, setNewL] = useState<number | "">(1);
  const [newR, setNewR] = useState<number | "">(4);
  const [newX, setNewX] = useState<number | "">(3);
  const [tempSize, setTempSize] = useState<number | "">(size);

  const handleAdd = () => {
    if (newL === "" || newR === "" || newX === "") {
      alert("Please fill all fields!");
      return;
    }
    if (addUpdate(newL, newR, newX)) {
      // Success
    } else {
      alert("Invalid range or value!");
    }
  };

  const randomizeUpdates = () => {
    resetAll();
    const count = 3 + Math.floor(Math.random() * 3);
    for (let i = 0; i < count; i++) {
      const l = Math.floor(Math.random() * (size - 1));
      const r = l + Math.floor(Math.random() * (size - l));
      const x =
        (Math.floor(Math.random() * 10) + 1) * (Math.random() > 0.5 ? 1 : -1);
      addUpdate(l, r, x);
    }
  };

  return (
    <div className="technical-border bg-slate-900/40 backdrop-blur-md p-6 rounded-sm border-slate-800 flex flex-col gap-6 shadow-2xl">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-cyan-500/10 p-1.5 border border-cyan-500/20 rounded-lg">
              <SettingsIcon className="w-4 h-4 text-cyan-400" />
            </div>
            <h2 className="text-sm font-black text-white uppercase tracking-tighter">
              Settings
            </h2>
          </div>
          <span className="text-[10px] font-mono text-cyan-500/50">
            v1.0-mukut
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-end">
            <label className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">
              Set Array Size
            </label>
            <span className="text-[10px] font-mono text-cyan-400">
              {size} items
            </span>
          </div>
          {/* input for array size */}
          <div className="flex gap-2">
            <input
              type="number"
              value={tempSize}
              onChange={(e) =>
                setTempSize(
                  e.target.value === "" ? "" : parseInt(e.target.value)
                )
              }
              disabled={isAnimating}
              className="bg-slate-950 border border-slate-800 rounded-none px-3 py-2 text-cyan-400 w-full focus:border-cyan-500 outline-none transition-all font-mono text-sm"
              min="1"
              max="15"
            />
            <button
              onClick={() => tempSize !== "" && setSize(tempSize)}
              disabled={isAnimating}
              className="bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-4 py-2 text-[10px] font-black uppercase transition-all disabled:opacity-50"
            >
              Go
            </button>
          </div>
        </div>
      </div>

      <div className="h-[1px] bg-cyan-500/10" />

      {/* operations count */}
      <div className="bg-emerald-500/5 border border-emerald-500/20 p-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-1">
          <div className="w-1 h-1 bg-emerald-500 rounded-full" />
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] text-emerald-500 font-black uppercase tracking-widest mb-1">
            Total Operations Saved
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-emerald-400 font-mono">
              {operationsSaved}
            </span>
            <span className="text-[10px] text-emerald-600 font-mono uppercase">
              points
            </span>
          </div>
          <div className="w-full bg-emerald-500/10 h-1 mt-2">
            <div
              className="h-full bg-emerald-500 transition-all duration-1000"
              style={{
                width: `${Math.min(
                  100,
                  (operationsSaved / (size * 5)) * 100
                )}%`,
              }}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-pink-500/10 p-1.5 border border-pink-500/20 rounded-lg">
              <PlusIcon className="w-4 h-4 text-pink-500" />
            </div>
            <h2 className="text-sm font-black text-white uppercase tracking-tighter">
              Add Updates
            </h2>
          </div>
          <button
            onClick={randomizeUpdates}
            className="text-[9px] text-slate-500 hover:text-cyan-400 transition-colors uppercase font-bold"
          >
            [ Random ]
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="space-y-1">
            <label className="text-[9px] text-slate-500 font-bold uppercase">
              Left (L)
            </label>
            <input
              type="number"
              value={newL}
              onChange={(e) =>
                setNewL(e.target.value === "" ? "" : parseInt(e.target.value))
              }
              disabled={isAnimating}
              className="bg-slate-950 border border-slate-800 rounded-none px-2 py-2 text-white w-full text-center font-mono text-sm"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[9px] text-slate-500 font-bold uppercase">
              Right (R)
            </label>
            <input
              type="number"
              value={newR}
              onChange={(e) =>
                setNewR(e.target.value === "" ? "" : parseInt(e.target.value))
              }
              disabled={isAnimating}
              className="bg-slate-950 border border-slate-800 rounded-none px-2 py-2 text-white w-full text-center font-mono text-sm"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[9px] text-slate-500 font-bold uppercase">
              Value (X)
            </label>
            <input
              type="number"
              value={newX}
              onChange={(e) =>
                setNewX(e.target.value === "" ? "" : parseInt(e.target.value))
              }
              disabled={isAnimating}
              className="bg-slate-950 border border-slate-800 rounded-none px-2 py-2 text-cyan-400 w-full text-center font-mono text-sm"
            />
          </div>
        </div>

        <button
          onClick={handleAdd}
          disabled={isAnimating}
          className="w-full bg-cyan-600 hover:bg-cyan-500 text-white rounded-none py-3 text-xs font-black uppercase tracking-[0.2em] transition-all disabled:opacity-50 relative overflow-hidden group"
        >
          <span className="relative z-10">Add Update</span>
          <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform" />
        </button>
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
            Pending Tasks
          </h3>
          <span className="text-[9px] font-mono bg-slate-800 px-1 text-slate-400">
            {updates.length} items
          </span>
        </div>
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-2 max-h-40">
          {updates.length === 0 && (
            <div className="border border-dashed border-slate-800 p-4 text-center">
              <p className="text-slate-600 italic text-[10px] uppercase font-bold">
                Waiting for input data...
              </p>
            </div>
          )}
          {updates.map((upd) => (
            <div
              key={upd.id}
              className="bg-slate-950 border-l-2 border-slate-800 hover:border-cyan-500 p-2 flex justify-between items-center transition-colors"
            >
              <span className="font-mono text-[10px] text-slate-400">
                SEGMENT [<span className="text-white">{upd.l}</span>:
                <span className="text-white">{upd.r}</span>] &rarr;{" "}
                <span
                  className={upd.x >= 0 ? "text-emerald-400" : "text-pink-400"}
                >
                  {upd.x > 0 ? "+" : ""}
                  {upd.x}
                </span>
              </span>
              <button
                onClick={() => removeUpdate(upd.id)}
                disabled={isAnimating}
                className="text-slate-700 hover:text-red-500 transition-colors p-1"
                title="Remove Update"
              >
                <TrashIcon className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="h-[1px] bg-cyan-500/10" />

      {/* View result step by step */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-[9px] font-black uppercase text-slate-600 tracking-widest">
            Process Control
          </span>
          <span className="text-[9px] font-mono text-cyan-500">
            {playbackIndex >= 0 ? `Step ${playbackIndex + 1}/${size}` : "Ready"}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={stepBackward}
            disabled={isAnimating || updates.length === 0}
            className="flex-1 bg-slate-950 border border-slate-800 hover:border-slate-600 text-slate-400 p-2 flex items-center justify-center transition-all disabled:opacity-20 rounded-lg group"
            title="Prev"
          >
            <PrevIcon className="w-4 h-4 group-hover:text-cyan-400 transition-colors" />
          </button>
          <button
            onClick={onAnimate}
            disabled={isAnimating || updates.length === 0}
            className={`flex-[2] ${
              isAnimating
                ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/30"
                : "bg-cyan-600 text-white"
            } rounded-lg py-2 text-[10px] font-black uppercase tracking-widest transition-all disabled:opacity-50 flex items-center justify-center gap-2 border border-transparent`}
          >
            {isAnimating ? (
              <>
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
                Working...
              </>
            ) : (
              <>
                <PlayIcon className="w-3 h-3" /> Show Result
              </>
            )}
          </button>
          <button
            onClick={stepForward}
            disabled={isAnimating || updates.length === 0}
            className="flex-1 bg-slate-950 border border-slate-800 hover:border-slate-600 text-slate-400 p-2 flex items-center justify-center transition-all disabled:opacity-20 rounded-lg group"
            title="Next"
          >
            <NextIcon className="w-4 h-4 group-hover:text-cyan-400 transition-colors" />
          </button>
        </div>
        <button
          onClick={resetAll}
          disabled={isAnimating}
          className="w-full text-[9px] font-black uppercase tracking-[0.3em] text-red-900 hover:text-red-500 py-1 transition-colors text-center"
        >
          [ Reset Visualizer ]
        </button>
      </div>
    </div>
  );
};
