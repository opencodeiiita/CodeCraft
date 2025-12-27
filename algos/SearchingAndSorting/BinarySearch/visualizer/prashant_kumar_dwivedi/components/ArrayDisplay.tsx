import { Step } from "../utils/binarySearchUtils";

interface ArrayDisplayProps {
  array: number[];
  current?: Step;
}

export default function ArrayDisplay({ array, current }: ArrayDisplayProps) {
  return (
    <div className="mb-6 min-h-[120px] p-4 bg-white border-2 border-gray-200 rounded-lg flex flex-wrap justify-center items-center gap-2">
      {array.length > 0 ? (
        array.map((num, index) => {
          let className =
            "border-2 px-3 py-2 text-center min-w-[60px] rounded font-mono transition-all";
          if (current) {
            if (index < current.low || index > current.high) {
              className += " opacity-50 bg-gray-100 border-gray-300";
            }
            if (index === current.mid) {
              className += " bg-yellow-300 border-yellow-500 shadow-md";
            }
            if (current.found && index === current.foundIndex) {
              className += " bg-green-300 border-green-500 shadow-md";
            }
          } else {
            className += " bg-gray-100 border-gray-300";
          }
          return (
            <div key={index} className={className}>
              <div className="font-bold">{num}</div>
              <div className="text-xs text-gray-600">[{index}]</div>
            </div>
          );
        })
      ) : (
        <div className="text-gray-500 text-center">
          <p className="text-lg">No array set</p>
          <p className="text-sm">
            Enter an array above and click "Set Array" or "Generate Random
            Array"
          </p>
        </div>
      )}
    </div>
  );
}
