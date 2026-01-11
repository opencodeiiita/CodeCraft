import { Step } from "../utils/binarySearchUtils";

interface ArrayDisplayProps {
  array: number[];
  current?: Step;
}

export default function ArrayDisplay({ array, current }: ArrayDisplayProps) {
  return (
    <div className="mb-4 sm:mb-6 h-[120px] sm:h-[140px] p-2 sm:p-4 bg-white border-2 border-gray-200 rounded-lg flex flex-col justify-center items-center gap-1 sm:gap-2">
      {current && array.length > 0 && (
        <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 mb-1 sm:mb-2 w-full">
          {array.map((_, index) => {
            const isLow = index === current.low;
            const isHigh = index === current.high;
            const isMid = index === current.mid;

            return (
              <div
                key={`pointer-${index}`}
                className="min-w-[36px] sm:min-w-[44px] text-center"
              >
                {isLow && (
                  <div className="text-blue-600 font-semibold text-xs sm:text-sm">
                    low
                  </div>
                )}
                {isHigh && (
                  <div className="text-red-600 font-semibold text-xs sm:text-sm">
                    high
                  </div>
                )}
                {isMid && (
                  <div className="text-yellow-600 font-semibold text-xs sm:text-sm">
                    mid
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 w-full">
        {array.length > 0 ? (
          array.map((num, index) => {
            let className =
              "px-2 sm:px-3 py-1.5 sm:py-2 text-center min-w-[36px] sm:min-w-[44px] rounded-lg border font-mono text-xs sm:text-sm font-semibold transition-colors duration-200";

            if (current) {
              if (index < current.low || index > current.high) {
                className += " bg-gray-50 border-gray-200 text-gray-400";
              } else if (index === current.mid) {
                className += " bg-blue-500 border-blue-600 text-white";
              } else if (current.found && index === current.foundIndex) {
                className += " bg-green-100 border-green-300 text-green-800";
              } else {
                className += " bg-blue-200 border-blue-200 text-blue-700";
              }
            } else {
              className += " bg-white border-gray-200 text-gray-700";
            }

            return (
              <div key={index} className={className}>
                <div className="leading-tight">{num}</div>
                <div
                  className={`text-[10px] sm:text-xs mt-0.5 ${
                    index === current?.mid ? "text-white" : "text-gray-600"
                  }`}
                >
                  [{index}]
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-gray-500 text-center px-4 py-4">
            <p className="text-sm font-medium">No array set</p>
            <p className="text-xs mt-1">
              Enter an array above and click "Set Array" or "Generate Random
              Array"
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
