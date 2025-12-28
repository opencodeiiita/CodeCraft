'use client';

import React, { useState, useEffect, useCallback } from 'react';
import ArrayDisplay from './ArrayDisplay';
import Controls from './Controls';
import { generateBinarySearchSteps, Step } from '@/utils/binarySearchLogic';

const BinarySearchVisualizer: React.FC = () => {
    const [arraySize, setArraySize] = useState(10);
    const [array, setArray] = useState<number[]>([]);
    const [targetInput, setTargetInput] = useState('');
    const [steps, setSteps] = useState<Step[]>([]);
    const [currentStepIndex, setCurrentStepIndex] = useState(-1);
    const [isSearching, setIsSearching] = useState(false);

    // Generate a sorted array
    const generateArray = useCallback(() => {
        const newArray = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 100))
            .sort((a, b) => a - b);
        setArray(newArray);
        resetSearch();
    }, [arraySize]);

    // Initial generation
    useEffect(() => {
        generateArray();
    }, [generateArray]);

    const resetSearch = () => {
        setSteps([]);
        setCurrentStepIndex(-1);
        setIsSearching(false);
    };

    const handleSearch = () => {
        const target = parseInt(targetInput, 10);
        if (isNaN(target)) return;

        const generatedSteps = generateBinarySearchSteps(array, target);
        setSteps(generatedSteps);
        setCurrentStepIndex(0); // Start at the first step
        setIsSearching(true);
    };

    const handleNext = () => {
        if (currentStepIndex < steps.length - 1) {
            setCurrentStepIndex((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex((prev) => prev - 1);
        }
    };

    const handleReset = () => {
        resetSearch();
        setTargetInput('');
    };

    // Current state derived from step
    const currentStep = currentStepIndex >= 0 ? steps[currentStepIndex] : null;

    const low = currentStep ? currentStep.low : 0;
    const high = currentStep ? currentStep.high : array.length - 1;
    const mid = currentStep ? currentStep.mid : null;
    const activeRange = currentStep ? currentStep.activeRange : [0, array.length - 1] as [number, number];
    const description = currentStep ? currentStep.description : 'Enter a target and click "Start Search" to begin.';

    return (
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">Binary Search Visualizer</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-center max-w-lg">
                Visualize how Binary Search divides the search interval in half to find a target value in a sorted array.
            </p>

            {/* Status / Description */}
            <div className="min-h-[60px] flex items-center justify-center bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 rounded-lg p-4 mb-8 w-full max-w-2xl text-center">
                <p className="text-lg font-medium text-blue-800 dark:text-blue-200">
                    {description}
                </p>
            </div>

            <ArrayDisplay
                array={array}
                low={low}
                high={high}
                mid={mid}
                activeRange={activeRange}
                target={isSearching && targetInput ? parseInt(targetInput) : null}
            />

            <Controls
                arraySize={arraySize}
                setArraySize={setArraySize}
                target={targetInput}
                setTarget={setTargetInput}
                onGenerate={generateArray}
                onSearch={handleSearch}
                onNext={handleNext}
                onPrev={handlePrev}
                onReset={handleReset}
                canNext={isSearching && currentStepIndex < steps.length - 1}
                canPrev={isSearching && currentStepIndex > 0}
                isSearching={isSearching}
            />

            {/* Legend */}
            <div className="mt-8 flex gap-6 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-200 dark:bg-yellow-900 border border-yellow-400 rounded"></div>
                    <span>Mid Element</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-200 dark:bg-green-900 border border-green-400 rounded"></div>
                    <span>Found Target</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-bold text-blue-500">L</span> / <span className="font-bold text-red-500">H</span>
                    <span>Low / High Pointers</span>
                </div>
            </div>
        </div>
    );
};

export default BinarySearchVisualizer;
