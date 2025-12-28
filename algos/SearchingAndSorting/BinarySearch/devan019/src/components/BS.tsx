"use client"

import { useState } from "react"
import ArrayVisualizer from "./visualizer"
import ControlPanel from "./control"
import AlgorithmExplanation from "./explanation"


export default function BS() {
  const [inputArray, setInputArray] = useState<number[]>([1, 3, 5, 7, 9, 11, 13, 15, 17, 19])
  const [target, setTarget] = useState<number>(7)
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [isAutoRunning, setIsAutoRunning] = useState<boolean>(false)
  const [steps, setSteps] = useState<any[]>([])

  return (
    <div className="min-h-screen bg-gray-950 text-gray-50 p-6">
      <div className="max-w-7xl mx-auto">


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold mt-2 capitalize"> <span className="text-blue-600">{"> "}</span> BINARY_SEARCH_VIZ</h1>
            <div className="mt-2">O(logn) search computation </div>
            <div className="space-y-4">
              <ArrayVisualizer array={inputArray} steps={steps} currentStep={currentStep} />
              <AlgorithmExplanation />
            </div>
          </div>
          <div className="space-y-6">
            <ControlPanel
              inputArray={inputArray}
              setInputArray={setInputArray}
              target={target}
              setTarget={setTarget}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              isAutoRunning={isAutoRunning}
              setIsAutoRunning={setIsAutoRunning}
              steps={steps}
              setSteps={setSteps}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
