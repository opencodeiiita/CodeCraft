"use client";

import { useState } from "react";

interface Update {
  L: number;
  R: number;
  X: number;
}

interface Props {
  onAddUpdate: (update: Update) => void;
  updates: Update[];
}

export default function UpdateControls({ onAddUpdate, updates }: Props) {
  const [L, setL] = useState("");
  const [R, setR] = useState("");
  const [X, setX] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const l = parseInt(L);
    const r = parseInt(R);
    const x = parseInt(X);
    if (!isNaN(l) && !isNaN(r) && !isNaN(x) && l <= r) {
      onAddUpdate({ L: l, R: r, X: x });
      setL("");
      setR("");
      setX("");
    }
  };

  return (
    <div className="card p-6 fade-in">
      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
        Add Range Update
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Start (L)
            </label>
            <input
              type="number"
              placeholder="0"
              value={L}
              onChange={(e) => setL(e.target.value)}
              className="input"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              End (R)
            </label>
            <input
              type="number"
              placeholder="2"
              value={R}
              onChange={(e) => setR(e.target.value)}
              className="input"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Value (X)
            </label>
            <input
              type="number"
              placeholder="5"
              value={X}
              onChange={(e) => setX(e.target.value)}
              className="input"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full"
        >
          Add Update
        </button>
      </form>

      <div>
        <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
          Applied Updates ({updates.length})
        </h4>
        {updates.length > 0 ? (
          <ul className="space-y-2">
            {updates.map((u, i) => (
              <li key={i} className="flex items-center justify-between bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Add <strong>{u.X}</strong> to range <strong>[{u.L}, {u.R}]</strong>
                </span>
                <span className="text-xs text-slate-400 dark:text-slate-500">
                  #{i + 1}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-slate-500 dark:text-slate-400 italic">
            No updates added yet
          </p>
        )}
      </div>
    </div>
  );
}