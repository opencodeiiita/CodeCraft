import { Step } from "../utils/binarySearchUtils";

interface ControlsProps {
  prevStep: () => void;
  nextStep: () => void;
  reset: () => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  setCurrentStep: (step: number) => void;
  steps: Step[];
  currentStep: number;
  speed: number;
  setSpeed: (speed: number) => void;
}

export default function Controls({
  prevStep,
  nextStep,
  reset,
  isPlaying,
  setIsPlaying,
  setCurrentStep,
  steps,
  currentStep,
  speed,
  setSpeed,
}: ControlsProps) {
  return (
    <>
      <div className="mb-6 flex flex-wrap gap-3 justify-center">
        <button
          onClick={prevStep}
          disabled={steps.length === 0 || currentStep === 0}
          className="bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Previous Step
        </button>

        <button
          onClick={nextStep}
          disabled={steps.length === 0 || currentStep >= steps.length - 1}
          className="bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Next Step
        </button>

        <button
          onClick={reset}
          className="bg-red-700 text-white px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>

      <div className="mb-6 flex flex-wrap gap-3 justify-center items-center">
        <button
          onClick={() => {
            if (!isPlaying) {
              setCurrentStep(0);
            }
            setIsPlaying(!isPlaying);
          }}
          disabled={steps.length === 0}
          className="bg-purple-700 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {isPlaying ? "Pause" : "Auto Play"}
        </button>

        <label className="flex items-center">
          Speed: Slow
          <input
            type="range"
            min="500"
            max="3000"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="ml-2 mx-2"
          />
          Fast
        </label>
      </div>
    </>
  );
}
