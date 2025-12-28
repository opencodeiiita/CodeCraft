import React from 'react';

interface ControlsProps {
    arraySize: number;
    setArraySize: (size: number) => void;
    target: string;
    setTarget: (target: string) => void;
    onGenerate: () => void;
    onSearch: () => void;
    onNext: () => void;
    onPrev: () => void;
    onReset: () => void;
    canNext: boolean;
    canPrev: boolean;
    isSearching: boolean;
}

const Controls: React.FC<ControlsProps> = ({
    arraySize,
    setArraySize,
    target,
    setTarget,
    onGenerate,
    onSearch,
    onNext,
    onPrev,
    onReset,
    canNext,
    canPrev,
    isSearching,
}) => {
    return (
        <div className="flex flex-col gap-6 w-full max-w-2xl bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            {/* Configuration */}
            <div className="flex flex-wrap gap-4 items-end justify-center">
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Array Size</label>
                    <input
                        type="number"
                        min="5"
                        max="20"
                        value={arraySize}
                        onChange={(e) => setArraySize(Number(e.target.value))}
                        className="px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none w-24"
                    />
                </div>
                <button
                    onClick={onGenerate}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                    Generate New Array
                </button>
            </div>

            <div className="h-px bg-gray-200 dark:bg-gray-700 w-full" />

            {/* Search Controls */}
            <div className="flex flex-wrap gap-4 items-end justify-center">
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Target Value</label>
                    <input
                        type="number"
                        value={target}
                        onChange={(e) => setTarget(e.target.value)}
                        placeholder="Enter number"
                        className="px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none w-32"
                    />
                </div>
                <button
                    onClick={onSearch}
                    disabled={!target || isSearching}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
                >
                    Start Search
                </button>
                <button
                    onClick={onReset}
                    className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
                >
                    Reset
                </button>
            </div>

            {/* Playback Controls */}
            <div className="flex gap-4 justify-center mt-2">
                <button
                    onClick={onPrev}
                    disabled={!canPrev}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                    <span>⏮️</span> Prev
                </button>
                <button
                    onClick={onNext}
                    disabled={!canNext}
                    className="px-4 py-2 bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 disabled:opacity-50 text-blue-800 dark:text-blue-100 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                    Next <span>▶️</span>
                </button>
            </div>
        </div>
    );
};

export default Controls;
