"use client";

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
  const [arrayInput, setArrayInput] = useState("");
  const [target, setTarget] = useState("");
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);

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
    if (!target.trim() || isNaN(targetNum)) {
      alert("Please enter a valid search value.");
      return;
    }

    const searchSteps = performBinarySearch(array, targetNum);
    setSteps(searchSteps);
    setCurrentStep(0);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
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
      const delay = 3500 - speed;
      const timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, delay);

      return () => clearTimeout(timer);
    }

    if (isPlaying && currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentStep, steps.length, speed]);

  const current = steps[currentStep];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-2 sm:p-4 bg-slate-800">
      <div className="max-w-7xl w-full bg-white rounded-lg shadow-lg p-3 sm:p-6 h-full max-h-screen overflow-auto">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-center text-gray-800">
          Binary Search Visualizer
        </h1>

        <div className="flex flex-col xl:flex-row gap-4 sm:gap-6 xl:gap-8 h-[calc(100%-3rem)] sm:h-[calc(100%-4rem)]">
          <div className="flex-1 xl:flex-[2] space-y-3 sm:space-y-4 overflow-y-auto bg-gray-200 rounded-lg p-3 sm:p-4 border border-gray-200">
            <div className="text-center text-sm sm:text-base">
              Searching for:{" "}
              <span className="font-semibold">{target || "none"}</span>
            </div>

            <ArrayDisplay array={array} current={current} />
            <StepDisplay current={current} currentStep={currentStep} />
            <ResultsDisplay steps={steps} currentStep={currentStep} />
          </div>

          <div className="flex-1 xl:flex-[1] space-y-3 sm:space-y-4 overflow-y-auto bg-gray-200 rounded-lg p-3 sm:p-4 border border-gray-200 shadow-sm xl:max-w-sm">
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1 text-gray-700">
                  Array (comma-separated numbers):
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={arrayInput}
                    onChange={(e) => setArrayInput(e.target.value)}
                    className="border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 flex-1 rounded text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 1,3,5,7,9"
                  />
                  <button
                    onClick={setArrayFromInput}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded text-xs sm:text-sm font-medium transition-colors whitespace-nowrap"
                  >
                    Set Array
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1 text-gray-700">
                  Target Value:
                </label>
                <input
                  type="number"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className="border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 w-full rounded text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 5"
                />
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={generateArray}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm font-medium transition-colors"
                >
                  Generate Random Array
                </button>
                <button
                  onClick={startSearch}
                  disabled={!target.trim()}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Let's visualize
                </button>
              </div>
            </div>

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
      </div>
    </div>
  );
}
