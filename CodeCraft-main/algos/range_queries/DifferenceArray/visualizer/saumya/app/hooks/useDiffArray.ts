import { useState, useEffect, useCallback } from "react";
import { Update } from "../types";

export const useDiffArray = () => {
  const [size, setSize] = useState<number>(10);
  const [updates, setUpdates] = useState<Update[]>([]);

  const [diffArray, setDiffArray] = useState<number[]>([]);
  const [finalArray, setFinalArray] = useState<number[]>([]);

  const [isComputing, setIsComputing] = useState(false);
  const [computeIndex, setComputeIndex] = useState<number>(-1);

  useEffect(() => {
    resetVisualizer();
  }, [size]);

  useEffect(() => {
    const newDiff = new Array(size + 1).fill(0);
    updates.forEach((u) => {
      if (u.l < newDiff.length) newDiff[u.l] += u.val;
      if (u.r + 1 < newDiff.length) newDiff[u.r + 1] -= u.val;
    });
    setDiffArray(newDiff);
    setComputeIndex(-1);
    setIsComputing(false);
    setFinalArray(new Array(size).fill(0));
  }, [updates, size]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isComputing && computeIndex < size) {
      interval = setTimeout(() => {
        setFinalArray((prev) => {
          const next = [...prev];
          const prevVal = computeIndex === 0 ? 0 : next[computeIndex - 1];
          next[computeIndex] = prevVal + diffArray[computeIndex];
          return next;
        });
        setComputeIndex((prev) => prev + 1);
      }, 600);
    } else if (computeIndex >= size) {
      setIsComputing(false);
    }

    return () => clearTimeout(interval);
  }, [isComputing, computeIndex, diffArray, size]);

  const resetVisualizer = useCallback(() => {
    setUpdates([]);
    setDiffArray(new Array(size + 1).fill(0));
    setFinalArray(new Array(size).fill(0));
    setComputeIndex(-1);
    setIsComputing(false);
  }, [size]);

  const addUpdate = (l: number, r: number, val: number) => {
    if (l < 0 || r >= size || l > r) {
      alert(`Invalid Range: Ensure 0 <= L <= R < ${size}`);
      return;
    }
    setUpdates((prev) => [...prev, { l, r, val, id: Date.now() }]);
  };

  const removeUpdate = (id: number) => {
    setUpdates((prev) => prev.filter((u) => u.id !== id));
  };

  const startComputation = () => {
    setFinalArray(new Array(size).fill(0));
    setComputeIndex(0);
    setIsComputing(true);
  };

  return {
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
  };
};