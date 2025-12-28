export type Step = {
  low: number;
  high: number;
  mid: number | null;
  found: boolean;
  description: string;
  activeRange: [number, number]; // [start, end] inclusive
};

export const generateBinarySearchSteps = (array: number[], target: number): Step[] => {
  const steps: Step[] = [];
  let low = 0;
  let high = array.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    
    // Step 1: Calculate mid
    steps.push({
      low,
      high,
      mid,
      found: false,
      description: `Calculated mid = floor((${low} + ${high}) / 2) = ${mid}`,
      activeRange: [low, high],
    });

    if (array[mid] === target) {
      // Found
      steps.push({
        low,
        high,
        mid,
        found: true,
        description: `Found target ${target} at index ${mid}!`,
        activeRange: [low, high],
      });
      return steps;
    } else if (array[mid] < target) {
      // Target is in the right half
      steps.push({
        low,
        high,
        mid,
        found: false,
        description: `arr[${mid}] (${array[mid]}) < target (${target}). Moving low to mid + 1.`,
        activeRange: [low, high],
      });
      low = mid + 1;
    } else {
      // Target is in the left half
      steps.push({
        low,
        high,
        mid,
        found: false,
        description: `arr[${mid}] (${array[mid]}) > target (${target}). Moving high to mid - 1.`,
        activeRange: [low, high],
      });
      high = mid - 1;
    }
  }

  // Not found
  steps.push({
    low,
    high,
    mid: null,
    found: false,
    description: `Target ${target} not found in the array.`,
    activeRange: [low, high], // This might be invalid range like [5, 4], which is fine for display logic to handle (empty)
  });

  return steps;
};
