"use client";

import { useState, useMemo } from "react";
import ArrayDisplay from "./components/ArrayDisplay";
import UpdateControls from "./components/UpdateControls";

interface Update {
  L: number;
  R: number;
  X: number;
}

export default function Home() {
  const [n, setN] = useState(8);
  const [updates, setUpdates] = useState<Update[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  const clearAllUpdates = () => {
    setUpdates([]);
    setCurrentStep(0);
  };
  const { diff, final, highlights, isFinal } = useMemo(() => {
    const appliedUpdates = updates.slice(0, currentStep);
    const diff = new Array(n).fill(0);
    for (const { L, R, X } of appliedUpdates) {
      if (L < n) diff[L] += X;
      if (R + 1 < n) diff[R + 1] -= X;
    }
    const final = new Array(n).fill(0);
    if (diff.length > 0) {
      final[0] = diff[0];
      for (let i = 1; i < n; i++) {
        final[i] = final[i - 1] + diff[i];
      }
    }
    const highlights =
      currentStep > 0 && currentStep <= updates.length
        ? [updates[currentStep - 1].L, updates[currentStep - 1].R + 1].filter((i) => i < n)
        : [];
    const isFinal = currentStep === updates.length;
    return { diff, final, highlights, isFinal };
  }, [updates, currentStep, n]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-purple-900 dark:to-purple-800">
      <div className="w-full max-w-7xl mx-auto px-6 py-8">
        <header className="mb-12 fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Difference Array
            <span className="block text-2xl md:text-3xl font-normal text-slate-600 dark:text-slate-300 mt-2">
              Interactive Visualizer
            </span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            Explore how range updates work with difference arrays. Add updates and watch the algorithm in action.
          </p>
        </header>

        <div className="mb-8 fade-in">
          <div className="card p-6 max-w-sm">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Array Size (n)
            </label>
            <input
              type="number"
              min="3"
              max="15"
              value={n}
              onChange={(e) =>
                setN(Math.min(15, Math.max(3, parseInt(e.target.value) || 8)))
              }
              className="input w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <ArrayDisplay
            title="Initial Array"
            subtitle="All zeros"
            array={new Array(n).fill(0)}
            colorScheme="gray"
          />
          <ArrayDisplay
            title="Difference Array"
            subtitle={
              isFinal
                ? "Final state"
                : `After ${currentStep} update${currentStep === 1 ? "" : "s"}`
            }
            array={diff}
            highlights={highlights}
            colorScheme="blue"
          />
          <ArrayDisplay
            title="Final Array"
            subtitle={isFinal ? "Computed result" : "Preview"}
            array={isFinal ? final : new Array(n).fill("?")}
            colorScheme="green"
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <UpdateControls
            onAddUpdate={(u) => setUpdates([...updates, u])}
            updates={updates}
          />

          <div className="card p-6">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
              Step Navigation
            </h3>
            <div className="flex flex-wrap gap-3 mb-6">
              <button
                onClick={() => setCurrentStep(0)}
                className="btn btn-secondary"
              >
                Reset
              </button>
              <button
                onClick={clearAllUpdates}
                disabled={updates.length === 0}
                className="btn btn-danger disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Clear All Updates
              </button>
              <button
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={currentStep > updates.length}
                className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentStep < updates.length ? "Next Update" : "Compute Final"}
              </button>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 min-h-[3rem] flex items-center">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {currentStep === 0 && "Add some range updates to get started."}
                {currentStep > 0 && currentStep <= updates.length &&
                  `Step ${currentStep}: Adding ${updates[currentStep - 1].X} to range [${updates[currentStep - 1].L}, ${updates[currentStep - 1].R}]`}
                {isFinal && "🎉 All updates applied! The final array is ready."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}