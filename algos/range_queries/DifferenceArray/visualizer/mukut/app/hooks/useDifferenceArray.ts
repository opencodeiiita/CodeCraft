import { useState, useMemo } from 'react';

export interface Update {
  id: string;
  l: number;
  r: number;
  x: number;
}

export const useDifferenceArray = (initialSize: number = 6) => {
  const [size, setSize] = useState(initialSize);
  const [baseArray, setBaseArray] = useState<number[]>(new Array(initialSize).fill(0));
  const [updates, setUpdates] = useState<Update[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(-1); // -1: Not started, 0..size-1: reconstruction steps

  const diffArray = useMemo(() => {
    const arr = new Array(size).fill(0);
    updates.forEach((upd) => {
      if (upd.l < size) arr[upd.l] += upd.x;
      if (upd.r + 1 < size) arr[upd.r + 1] -= upd.x;
    });
    return arr;
  }, [size, updates]);

  const finalArray = useMemo(() => {
    const arr = new Array(size).fill(0);
    // Final = Base + PrefixSum(Diff)
    let current = 0;
    for (let i = 0; i < size; i++) {
      current += diffArray[i];
      arr[i] = baseArray[i] + current;
    }
    return arr;
  }, [diffArray, size, baseArray]);

  const addUpdate = (l: number, r: number, x: number) => {
    if (l < 0 || l >= size || r < l || isNaN(x)) return false;
    const newUpdate: Update = {
      id: Math.random().toString(36).substr(2, 9),
      l,
      r,
      x,
    };
    setUpdates([...updates, newUpdate]);
    setCurrentStep(-1);
    return true;
  };

  const removeUpdate = (id: string) => {
    setUpdates(updates.filter((u) => u.id !== id));
    setCurrentStep(-1);
  };

  const resetAll = () => {
    setUpdates([]);
    setBaseArray(new Array(size).fill(0));
    setCurrentStep(-1);
    setActiveIndex(null);
    setIsAnimating(false);
  };

  const operationsSaved = useMemo(() => {
    const totalNaiveOps = updates.reduce((sum, upd) => sum + (upd.r - upd.l + 1), 0);
    const totalOptimalOps = (updates.length * 2) + size; // 2 ops per update + 1 pass for reconstruction
    return Math.max(0, totalNaiveOps - totalOptimalOps);
  }, [updates, size]);

  const handleResize = (newSize: number) => {
    if (newSize < 1 || newSize > 15) return;
    setSize(newSize);
    setBaseArray(new Array(newSize).fill(0));
    setUpdates([]);
    setCurrentStep(-1);
    setActiveIndex(null);
  };

  const handleSetBase = (newBase: number[]) => {
    if (newBase.length !== size) return;
    setBaseArray(newBase);
    setCurrentStep(-1);
  };

  const stepForward = () => {
    if (currentStep < size - 1) {
      const next = currentStep + 1;
      setCurrentStep(next);
      setActiveIndex(next);
      return true;
    }
    return false;
  };

  const stepBackward = () => {
    if (currentStep > 0) {
      const prev = currentStep - 1;
      setCurrentStep(prev);
      setActiveIndex(prev);
      return true;
    } else if (currentStep === 0) {
        setCurrentStep(-1);
        setActiveIndex(null);
        return true;
    }
    return false;
  };

  return {
    size,
    setSize: handleResize,
    baseArray,
    setBaseArray: handleSetBase,
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
  };
};
