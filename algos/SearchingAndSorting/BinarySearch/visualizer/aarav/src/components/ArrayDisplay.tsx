import React from 'react';

interface ArrayDisplayProps {
    array: number[];
    low: number;
    high: number;
    mid: number | null;
    activeRange: [number, number];
    target: number | null;
}

const ArrayDisplay: React.FC<ArrayDisplayProps> = ({ array, low, high, mid, activeRange, target }) => {
    return (
        <div className="flex flex-col items-center gap-4 my-8 w-full overflow-x-auto p-4">
            <div className="flex gap-2">
                {array.map((value, index) => {
                    const isActive = index >= activeRange[0] && index <= activeRange[1];
                    const isMid = index === mid;
                    const isLow = index === low;
                    const isHigh = index === high;
                    const isTarget = target !== null && value === target && isMid; // Highlight if found at mid

                    let bgColor = 'bg-gray-200 dark:bg-gray-700';
                    let borderColor = 'border-gray-300 dark:border-gray-600';
                    let textColor = 'text-gray-800 dark:text-gray-200';
                    let opacity = 'opacity-100';

                    if (!isActive) {
                        opacity = 'opacity-30';
                    } else {
                        if (isMid) {
                            bgColor = 'bg-yellow-200 dark:bg-yellow-900';
                            borderColor = 'border-yellow-400 dark:border-yellow-700';
                        }
                        if (isTarget) {
                            bgColor = 'bg-green-200 dark:bg-green-900';
                            borderColor = 'border-green-400 dark:border-green-700';
                        }
                    }

                    return (
                        <div key={index} className={`flex flex-col items-center ${opacity} transition-all duration-300`}>
                            {/* Pointers */}
                            <div className="h-6 text-xs font-bold text-blue-500 mb-1">
                                {isLow && <span>L</span>}
                            </div>

                            {/* Array Element */}
                            <div
                                className={`
                  w-12 h-12 flex items-center justify-center 
                  border-2 rounded-lg font-mono text-lg font-bold shadow-sm
                  ${bgColor} ${borderColor} ${textColor}
                `}
                            >
                                {value}
                            </div>

                            {/* Index */}
                            <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 font-mono">
                                {index}
                            </div>

                            {/* Pointers (Bottom) */}
                            <div className="h-6 text-xs font-bold text-red-500 mt-1">
                                {isHigh && <span>H</span>}
                                {isMid && !isHigh && !isLow && <span className="text-yellow-600 dark:text-yellow-400">M</span>}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ArrayDisplay;
