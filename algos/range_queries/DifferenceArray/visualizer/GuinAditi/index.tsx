'use client';

import { useState } from 'react';

export default function DifferenceArrayVisualizer() {
  const [n, setN] = useState(5);
  const [diff, setDiff] = useState<number[]>(Array(5).fill(0));
  const [finalArr, setFinalArr] = useState<number[]>([]);
  const [l, setL] = useState(0);
  const [r, setR] = useState(0);
  const [x, setX] = useState(0);

  const applyUpdate = () => {
    const newDiff = [...diff];
    newDiff[l] += x;
    if (r + 1 < n) newDiff[r + 1] -= x;
    setDiff(newDiff);
  };

  const buildFinalArray = () => {
    const res = [];
    let sum = 0;
    for (let i = 0; i < n; i++) {
      sum += diff[i];
      res.push(sum);
    }
    setFinalArr(res);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Difference Array Visualizer</h1>

      {/* Array Size */}
      <div>
        <label>Array Size: </label>
        <input
          type="number"
          value={n}
          onChange={(e) => {
            const size = Number(e.target.value);
            setN(size);
            setDiff(Array(size).fill(0));
            setFinalArr([]);
          }}
          className="border px-2 ml-2"
        />
      </div>

      {/* Inputs */}
      <div className="flex gap-2">
        <input type="number" placeholder="L" onChange={e => setL(+e.target.value)} className="border px-2" />
        <input type="number" placeholder="R" onChange={e => setR(+e.target.value)} className="border px-2" />
        <input type="number" placeholder="X" onChange={e => setX(+e.target.value)} className="border px-2" />
        <button onClick={applyUpdate} className="bg-blue-500 text-white px-3 rounded">
          Apply Update
        </button>
      </div>

      {/* Difference Array */}
      <div>
        <h2 className="font-semibold">Difference Array</h2>
        <div className="flex gap-2">
          {diff.map((v, i) => (
            <div key={i} className="p-2 border w-10 text-center">{v}</div>
          ))}
        </div>
      </div>

      {/* Final Array */}
      <button
        onClick={buildFinalArray}
        className="bg-green-500 text-white px-3 py-1 rounded"
      >
        Build Final Array
      </button>

      <div>
        <h2 className="font-semibold">Final Array</h2>
        <div className="flex gap-2">
          {finalArr.map((v, i) => (
            <div key={i} className="p-2 border w-10 text-center">{v}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
