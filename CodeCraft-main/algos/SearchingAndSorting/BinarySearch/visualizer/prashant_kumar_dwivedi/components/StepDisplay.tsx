import { Step } from "../utils/binarySearchUtils";

interface StepDisplayProps {
  current?: Step;
  currentStep: number;
}

export default function StepDisplay({
  current,
  currentStep,
}: StepDisplayProps) {
  return (
    <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-white rounded text-center">
      {current ? (
        <>
          <p className="font-semibold text-sm sm:text-base">
            Step {currentStep + 1}:
          </p>

          <p className="text-xs sm:text-sm">
            Low: {current.low}, High: {current.high}, Mid: {current.mid}
          </p>

          <p className="text-xs sm:text-sm">{current.message}</p>
        </>
      ) : (
        <>
          <p className="font-semibold text-sm sm:text-base">
            Ready to Visualize
          </p>

          <p className="text-xs sm:text-sm">Low: -, High: -, Mid: -</p>

          <p className="text-xs sm:text-sm">
            Click "Let's visualize" to start the binary search
          </p>
        </>
      )}
    </div>
  );
}
