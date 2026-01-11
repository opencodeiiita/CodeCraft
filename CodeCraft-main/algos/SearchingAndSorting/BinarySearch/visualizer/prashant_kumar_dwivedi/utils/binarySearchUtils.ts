export interface Step {
  low: number;
  high: number;
  mid: number;
  message: string;
  found: boolean;
  foundIndex?: number;
}

export const performBinarySearch = (
  array: number[],
  target: number
): Step[] => {
  const steps: Step[] = [];
  let low = 0;
  let high = array.length - 1;
  let found = false;
  let foundIndex = -1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    steps.push({
      low,
      high,
      mid,
      message: `mid = ${mid}, arr[${mid}] = ${array[mid]}, target = ${target}`,
      found: false,
    });
    if (array[mid] === target) {
      found = true;
      foundIndex = mid;
      steps[steps.length - 1].found = true;
      steps[steps.length - 1].foundIndex = mid;
      steps[steps.length - 1].message += `, Found at index ${mid}`;
      break;
    } else if (array[mid] < target) {
      steps[steps.length - 1].message += `, ${
        array[mid]
      } < ${target}, so low = ${mid + 1}`;
      low = mid + 1;
    } else {
      steps[steps.length - 1].message += `, ${
        array[mid]
      } > ${target}, so high = ${mid - 1}`;
      high = mid - 1;
    }
  }
  if (!found) {
    steps.push({
      low,
      high,
      mid: -1,
      message: `Target not found, low > high`,
      found: false,
    });
  }
  return steps;
};

export const generateRandomArray = (length: number = 10): number[] => {
  return Array.from({ length }, () => Math.floor(Math.random() * 100)).sort(
    (a, b) => a - b
  );
};

export const parseArrayInput = (input: string): number[] => {
  return input
    .split(",")
    .map((s) => parseInt(s.trim()))
    .filter((n) => !isNaN(n))
    .sort((a, b) => a - b);
};
