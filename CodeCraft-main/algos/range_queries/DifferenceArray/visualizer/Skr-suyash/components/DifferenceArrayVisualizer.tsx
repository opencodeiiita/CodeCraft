"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Update = { l: number; r: number; x: number };

export default function DifferenceArrayVisualizer() {
  const [n, setN] = useState(6);
  const [updates, setUpdates] = useState<Update[]>([]);
  const [step, setStep] = useState(0);
  const [initialArray, setInitialArray] = useState<number[]>(Array(6).fill(0));
  const [showArrayInput, setShowArrayInput] = useState(false);
  const [inputValues, setInputValues] = useState<{ [key: number]: string }>({});

  const [l, setL] = useState(0);
  const [r, setR] = useState(0);
  const [x, setX] = useState(0);

  // Ensure initialArray matches current size
  const currentInitialArray = initialArray.length === n 
    ? initialArray 
    : [...initialArray.slice(0, n), ...Array(Math.max(0, n - initialArray.length)).fill(0)];

  const diff = Array(n + 1).fill(0);
  for (let i = 0; i < step; i++) {
    diff[updates[i].l] += updates[i].x;
    if (updates[i].r + 1 < diff.length)
      diff[updates[i].r + 1] -= updates[i].x;
  }

  // Final array = initial array + prefix sum of diff
  const prefixSum = Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    prefixSum[i] = (i === 0 ? 0 : prefixSum[i - 1]) + diff[i];
  }
  
  const final = Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    final[i] = currentInitialArray[i] + prefixSum[i];
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Difference Array — Range Updates Visualizer
      </h1>

      {/* Controls */}
      <div className="bg-slate-800 rounded-xl p-6 mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Array Size (n)</label>
          <input
            type="number"
            min="2"
            max="20"
            value={n}
            onChange={(e) => {
              const newN = Math.max(2, Math.min(20, +e.target.value || 6));
              setN(newN);
              setUpdates(updates.filter(u => u.r < newN));
              setStep(Math.min(step, updates.filter(u => u.r < newN).length));
              // Adjust initial array size
              if (newN > initialArray.length) {
                setInitialArray([...initialArray, ...Array(newN - initialArray.length).fill(0)]);
              } else {
                setInitialArray(initialArray.slice(0, newN));
              }
              // Clear input values when size changes
              setInputValues({});
            }}
            className="w-full max-w-xs px-4 py-2 bg-slate-700 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Initial Array Input */}
        <div className="mb-4 p-4 bg-slate-700 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Initial Array Values</label>
            <button
              onClick={() => setShowArrayInput(!showArrayInput)}
              className="px-4 py-1.5 text-sm bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 rounded-lg font-medium text-white shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              {showArrayInput ? "Hide" : "Set Array"}
            </button>
          </div>
          
          {showArrayInput && (
            <div className="mt-3">
              <div className="flex flex-wrap gap-2 mb-3">
                {currentInitialArray.map((val, idx) => {
                  const inputValue = inputValues[idx] !== undefined ? inputValues[idx] : val.toString();
                  return (
                    <div key={idx} className="flex flex-col items-center gap-1">
                      <span className="text-xs text-slate-400 font-mono">{idx}</span>
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => {
                          const newVal = e.target.value;
                          setInputValues({ ...inputValues, [idx]: newVal });
                          if (newVal === "" || newVal === "-") {
                            // Allow empty or minus sign for typing
                            return;
                          }
                          const numVal = +newVal;
                          if (!isNaN(numVal)) {
                            const newArray = [...currentInitialArray];
                            newArray[idx] = numVal;
                            setInitialArray(newArray);
                          }
                        }}
                        onBlur={(e) => {
                          const numVal = +e.target.value;
                          if (isNaN(numVal) || e.target.value === "") {
                            const updatedValues = { ...inputValues };
                            updatedValues[idx] = currentInitialArray[idx].toString();
                            setInputValues(updatedValues);
                          } else {
                            const updatedValues = { ...inputValues };
                            updatedValues[idx] = numVal.toString();
                            setInputValues(updatedValues);
                          }
                        }}
                        onFocus={(e) => {
                          // Clear the input when focused if it's 0
                          if (currentInitialArray[idx] === 0 && inputValue === "0") {
                            setInputValues({ ...inputValues, [idx]: "" });
                          }
                        }}
                        className="w-16 px-2 py-1 bg-slate-600 rounded border border-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                      />
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const values = prompt("Enter array values separated by spaces (e.g., 1 2 3 4 5 6):");
                    if (values) {
                      const parsed = values.trim().split(/\s+/).map(v => +v || 0).slice(0, n);
                      const newArray = [...parsed, ...Array(Math.max(0, n - parsed.length)).fill(0)];
                      setInitialArray(newArray);
                      // Reset input values to sync with new array
                      setInputValues({});
                    }
                  }}
                  className="px-4 py-2 text-sm bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 rounded-lg font-medium text-white shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                >
                  Import from Space-Separated Values
                </button>
                <button
                  onClick={() => {
                    setInitialArray(Array(n).fill(0));
                    setInputValues({});
                  }}
                  className="px-4 py-2 text-sm bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 rounded-lg font-medium text-white shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                >
                  Reset to Zeros
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex-1 min-w-[120px]">
            <label className="block text-sm font-medium mb-2">Left Index (L)</label>
            <input
              type="number"
              min="0"
              max={n - 1}
              value={l}
              onChange={(e) => setL(Math.max(0, Math.min(n - 1, +e.target.value || 0)))}
              className="w-full px-4 py-2 bg-slate-700 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex-1 min-w-[120px]">
            <label className="block text-sm font-medium mb-2">Right Index (R)</label>
            <input
              type="number"
              min="0"
              max={n - 1}
              value={r}
              onChange={(e) => setR(Math.max(0, Math.min(n - 1, +e.target.value || 0)))}
              className="w-full px-4 py-2 bg-slate-700 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex-1 min-w-[120px]">
            <label className="block text-sm font-medium mb-2">Value (X)</label>
            <input
              type="number"
              value={x}
              onChange={(e) => setX(+e.target.value || 0)}
              className="w-full px-4 py-2 bg-slate-700 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                if (l <= r && r < n) {
                  setUpdates([...updates, { l, r, x }]);
                  setStep(updates.length + 1);
                }
              }}
              disabled={l > r || r >= n}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-600 disabled:to-slate-600 disabled:cursor-not-allowed rounded-lg font-semibold text-white shadow-lg hover:shadow-xl disabled:shadow-none transition-all duration-200 transform hover:scale-105 disabled:transform-none"
            >
              Add Update
            </button>
          </div>
        </div>

        {updates.length > 0 && (
          <div className="mb-4 pt-4 border-t border-slate-700">
            <div className="flex flex-wrap gap-2 justify-center">
              {updates.map((update, idx) => (
                <motion.button
                  key={idx}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  onClick={() => setStep(idx + 1)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-mono shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 ${
                    idx < step
                      ? "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                      : "bg-slate-600 hover:bg-slate-500 text-slate-200"
                  }`}
                >
                  ({update.l}, {update.r}, {update.x})
                </motion.button>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-4 justify-center items-center pt-4 border-t border-slate-700">
          <button
            disabled={step === 0}
            onClick={() => setStep(step - 1)}
            className="px-6 py-2.5 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 disabled:from-slate-700 disabled:to-slate-800 disabled:cursor-not-allowed disabled:opacity-50 rounded-lg font-semibold text-white shadow-md hover:shadow-lg disabled:shadow-none transition-all duration-200 transform hover:scale-105 disabled:transform-none"
          >
            ◀ Previous
          </button>
          <span className="px-5 py-2.5 text-slate-200 font-semibold bg-slate-700 rounded-lg shadow-inner border border-slate-600">
            Step {step} / {updates.length}
          </span>
          <button
            disabled={step === updates.length}
            onClick={() => setStep(step + 1)}
            className="px-6 py-2.5 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 disabled:from-slate-700 disabled:to-slate-800 disabled:cursor-not-allowed disabled:opacity-50 rounded-lg font-semibold text-white shadow-md hover:shadow-lg disabled:shadow-none transition-all duration-200 transform hover:scale-105 disabled:transform-none"
          >
            Next ▶
          </button>
          {updates.length > 0 && (
            <button
              onClick={() => {
                setUpdates([]);
                setStep(0);
              }}
              className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 ml-4"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Initial Array */}
      <Section title="Initial Array">
        <div className="mb-2 text-sm text-slate-400 text-center">
          Starting values before any updates
        </div>
        <ArrayRow
          arr={currentInitialArray}
          type="initial"
          showIndex={true}
        />
      </Section>

      {/* Difference Array */}
      <Section title="Difference Array (diff[])">
        <div className="mb-2 text-sm text-slate-400 text-center">
          {step > 0 ? (
            <>
              After applying update ({updates[step - 1].l}, {updates[step - 1].r}, {updates[step - 1].x}):
              <br />
              diff[{updates[step - 1].l}] += {updates[step - 1].x}
              {updates[step - 1].r + 1 < n && (
                <>
                  {" "}and diff[{updates[step - 1].r + 1}] -= {updates[step - 1].x}
                </>
              )}
            </>
          ) : (
            "No updates applied yet"
          )}
        </div>
        <ArrayRow
          arr={diff.slice(0, n + 1)}
          highlight={
            step > 0
              ? [updates[step - 1].l, updates[step - 1].r + 1]
              : null
          }
          type="diff"
          showIndex={true}
        />
        <div className="mt-5 text-xs text-slate-500 text-center">
          Note: diff array has size n+1
        </div>
      </Section>

      {/* Final Array */}
      <Section title="Final Array (Initial + Prefix Sum of diff[])">
        <div className="mb-2 text-sm text-slate-400 text-center">
          Calculated by: final[i] = initial[i] + (final[i-1] + diff[i])
        </div>
        <ArrayRow 
          arr={final} 
          type="final"
          highlight={
            step > 0
              ? [updates[step - 1].l, updates[step - 1].r]
              : null
          }
          showIndex={true}
        />
        <div className="mt-5 text-xs text-slate-500 text-center">
          {step > 0 ? (
            <>Elements from index {updates[step - 1].l} to {updates[step - 1].r} are affected by the current update</>
          ) : (
            <>No updates applied yet</>
          )}
        </div>
      </Section>

      {/* Explanation */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 mt-6 shadow-2xl border border-slate-700">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            How Difference Array Works
          </h3>
        </div>
        <div className="space-y-6">
          <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-700">
            <p className="text-lg mb-4 text-slate-200">
              To update a range <span className="text-blue-400 font-semibold">[L, R]</span> by adding <span className="text-green-400 font-semibold">X</span>, we apply the update in <span className="text-yellow-400 font-bold">O(1)</span>:
            </p>
            <div className="bg-gradient-to-br from-slate-950 to-black p-5 rounded-lg border border-slate-700 shadow-inner">
              <div className="font-mono text-sm space-y-1">
                <div className="text-green-300">
                  <span className="text-purple-400">diff</span><span className="text-yellow-300">[</span><span className="text-blue-400">L</span><span className="text-yellow-300">]</span>   <span className="text-cyan-400">+=</span> <span className="text-green-400">X</span>
                </div>
                <div className="text-green-300">
                  <span className="text-purple-400">diff</span><span className="text-yellow-300">[</span><span className="text-blue-400">R+1</span><span className="text-yellow-300">]</span> <span className="text-red-400">-=</span> <span className="text-green-400">X</span>  <span className="text-slate-500">// if R+1 &lt;= n</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-700">
            <p className="text-lg mb-4 text-slate-200">
              The final array is obtained by adding the initial array values to the <span className="text-cyan-400 font-semibold">prefix sum</span> of the difference array:
            </p>
            <div className="bg-gradient-to-br from-slate-950 to-black p-5 rounded-lg border border-slate-700 shadow-inner">
              <pre className="font-mono text-sm text-green-300 overflow-x-auto">
                <code className="block space-y-1">
                  <div><span className="text-purple-400">prefix</span><span className="text-yellow-300">[</span><span className="text-cyan-400">0</span><span className="text-yellow-300">]</span> <span className="text-cyan-400">=</span> <span className="text-purple-400">diff</span><span className="text-yellow-300">[</span><span className="text-cyan-400">0</span><span className="text-yellow-300">]</span></div>
                  <div><span className="text-purple-400">prefix</span><span className="text-yellow-300">[</span><span className="text-blue-400">i</span><span className="text-yellow-300">]</span> <span className="text-cyan-400">=</span> <span className="text-purple-400">prefix</span><span className="text-yellow-300">[</span><span className="text-blue-400">i-1</span><span className="text-yellow-300">]</span> <span className="text-cyan-400">+</span> <span className="text-purple-400">diff</span><span className="text-yellow-300">[</span><span className="text-blue-400">i</span><span className="text-yellow-300">]</span>  <span className="text-slate-500">// for i &gt; 0</span></div>
                  <div><span className="text-purple-400">final</span><span className="text-yellow-300">[</span><span className="text-blue-400">i</span><span className="text-yellow-300">]</span> <span className="text-cyan-400">=</span> <span className="text-orange-400">initial</span><span className="text-yellow-300">[</span><span className="text-blue-400">i</span><span className="text-yellow-300">]</span> <span className="text-cyan-400">+</span> <span className="text-purple-400">prefix</span><span className="text-yellow-300">[</span><span className="text-blue-400">i</span><span className="text-yellow-300">]</span></div>
                </code>
              </pre>
            </div>
          </div>
          
          <div className="mt-6 p-5 bg-gradient-to-r from-slate-700/50 to-slate-800/50 rounded-xl border border-slate-600">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-600">
                <p className="text-xs text-slate-400 mb-1">Time Complexity</p>
                <p className="text-sm font-semibold text-yellow-400">
                  O(1) per update<br />
                  <span className="text-slate-300">O(n) to compute final</span>
                </p>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-600">
                <p className="text-xs text-slate-400 mb-1">Space Complexity</p>
                <p className="text-sm font-semibold text-green-400">O(n)</p>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-600">
                <p className="text-xs text-slate-400 mb-1">Use Case</p>
                <p className="text-sm font-semibold text-cyan-400">
                  Multiple range updates<br />
                  <span className="text-slate-300">before querying</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Components ---------- */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 mb-6 shadow-lg border border-slate-700">
      <h2 className="text-xl mb-5 font-bold text-slate-100">{title}</h2>
      {children}
    </div>
  );
}

function ArrayRow({
  arr,
  highlight,
  type,
  showIndex = false,
}: {
  arr: number[];
  highlight?: number[] | null;
  type: "diff" | "final" | "initial";
  showIndex?: boolean;
}) {
  const isHighlighted = (i: number) => {
    if (!highlight) return false;
    if (type === "diff") {
      return i === highlight[0] || i === highlight[1];
    } else {
      return i >= highlight[0] && i <= highlight[1];
    }
  };

  const gapClass = type === "final" ? "gap-8" : "gap-5";

  return (
    <div className={`flex flex-wrap ${gapClass} justify-center items-end`}>
      <AnimatePresence>
        {arr.map((v, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.7, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center gap-2"
          >
            {showIndex && (
              <span className="text-xs text-slate-400 font-mono">{i}</span>
            )}
            <div
              className={`w-14 h-14 flex items-center justify-center rounded-lg font-bold text-lg transition-all duration-300
                ${
                  isHighlighted(i)
                    ? "bg-yellow-400 text-black ring-4 ring-yellow-300 scale-110"
                    : type === "diff"
                    ? "bg-blue-600 hover:bg-blue-500"
                    : type === "initial"
                    ? "bg-purple-600 hover:bg-purple-500"
                    : "bg-green-600 hover:bg-green-500"
                }
              `}
            >
              {v}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

