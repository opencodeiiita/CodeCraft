"use client";

// BinarySearch.tsx is the main visualizer component.
// Since it uses React hooks like useState, it needs "use client" directive.
// In Next.js, components that use client-side features must be marked as client components.
// This differs from a normal React app where all components are client by default.

import { useState, useEffect } from "react";
import {
  performBinarySearch,
  generateRandomArray,
  parseArrayInput,
  Step,
} from "./utils/binarySearchUtils";
import ArrayDisplay from "./components/ArrayDisplay";
import StepDisplay from "./components/StepDisplay";
import ResultsDisplay from "./components/ResultsDisplay";
import Controls from "./components/Controls";

export default function BinarySearch() {
  const [array, setArray] = useState<number[]>([]);
  const [arrayInput, setArrayInput] = useState<string>("");
  const [target, setTarget] = useState<string>("");
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1000);

  const generateArray = () => {
    const newArray = generateRandomArray();
    setArray(newArray);
    setSteps([]);
    setCurrentStep(0);
  };

  const setArrayFromInput = () => {
    const nums = parseArrayInput(arrayInput);
    setArray(nums);
    setSteps([]);
    setCurrentStep(0);
  };

  const startSearch = () => {
    if (array.length === 0) return;
    const targetNum = Number(target);
    if (isNaN(targetNum) || !target.trim()) {
      alert("Please enter a valid search value.");
      return;
    }
    const newSteps = performBinarySearch(array, targetNum);
    setSteps(newSteps);
    setCurrentStep(0);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const reset = () => {
    setArray([]);
    setArrayInput("");
    setTarget("");
    setSteps([]);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      const actualSpeed = 3500 - speed;
      const timer = setTimeout(
        () => setCurrentStep(currentStep + 1),
        actualSpeed
      );
      return () => clearTimeout(timer);
    } else if (isPlaying) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentStep, steps.length, speed]);

  const current = steps[currentStep];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="max-w-5xl w-full bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Binary Search Visualizer
        </h1>

        <div className="mb-4">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Array (comma-separated numbers):
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={arrayInput}
                onChange={(e) => setArrayInput(e.target.value)}
                className="border border-gray-300 px-3 py-2 flex-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 1,3,5,7,9"
              />
              <button
                onClick={setArrayFromInput}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium transition-colors whitespace-nowrap"
              >
                Set Array
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Target Value:
            </label>
            <input
              type="number"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="border px-2 py-1 w-full"
              placeholder="e.g., 5"
            />
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={generateArray}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium transition-colors"
            >
              Generate Random Array
            </button>
            <button
              onClick={startSearch}
              disabled={!target.trim()}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-medium transition-colors"
            >
              Let's visualize
            </button>
          </div>
        </div>

        <div className="mb-4 text-center">
          Searching for:{" "}
          <span className="font-semibold">{target || "none"}</span>
        </div>

        <ArrayDisplay array={array} current={current} />
        <StepDisplay current={current} currentStep={currentStep} />
        <ResultsDisplay steps={steps} currentStep={currentStep} />
        <Controls
          prevStep={prevStep}
          nextStep={nextStep}
          reset={reset}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          setCurrentStep={setCurrentStep}
          steps={steps}
          currentStep={currentStep}
          speed={speed}
          setSpeed={setSpeed}
        />
      </div>
    </div>
  );
}
