import { Step } from "../utils/binarySearchUtils";

interface StepDisplayProps {
  current?: Step;
  currentStep: number;
}

export default function StepDisplay({
  current,
  currentStep,
}: StepDisplayProps) {
  if (!current) return null;
  return (
    <div className="mb-4 p-2 bg-gray-200 rounded text-center">
      <p className="font-semibold">Step {currentStep + 1}:</p>
      <p>
        Low: {current.low}, High: {current.high}, Mid: {current.mid}
      </p>
      <p>{current.message}</p>
    </div>
  );
}
