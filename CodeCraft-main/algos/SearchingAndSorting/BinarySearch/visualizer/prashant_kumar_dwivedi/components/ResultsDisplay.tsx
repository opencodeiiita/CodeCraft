import { Step } from "../utils/binarySearchUtils";

interface ResultsDisplayProps {
  steps: Step[];
  currentStep: number;
}

export default function ResultsDisplay({
  steps,
  currentStep,
}: ResultsDisplayProps) {
  return (
    <div className="min-h-[80px] sm:min-h-[100px] p-3 sm:p-6 bg-green-50 border border-green-200 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
      {steps.length > 0 && currentStep === steps.length - 1 ? (
        <div className="text-center">
          {steps[steps.length - 1].found ? (
            <div>
              <p className="text-green-800 font-bold text-base sm:text-lg mb-1">
                Target Found !
              </p>

              <p className="text-gray-700 text-sm sm:text-base">
                Index:{" "}
                <span className="font-semibold">
                  {steps[steps.length - 1].foundIndex}
                </span>
              </p>

              <p className="text-gray-700 text-sm sm:text-base">
                Total Steps:{" "}
                <span className="font-semibold">{steps.length}</span>
              </p>
            </div>
          ) : (
            <div>
              <p className="text-red-800 font-bold text-base sm:text-lg mb-1">
                Target Not Found !
              </p>

              <p className="text-gray-700 text-sm sm:text-base">
                Total Steps:{" "}
                <span className="font-semibold">{steps.length}</span>
              </p>
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-500 text-center text-sm sm:text-base">
          Results will appear here after completing the search
        </p>
      )}
    </div>
  );
}
