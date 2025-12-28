"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ControlPanelProps {
  inputArray: number[]
  setInputArray: (arr: number[]) => void
  target: number
  setTarget: (num: number) => void
  currentStep: number
  setCurrentStep: (step: number) => void
  isAutoRunning: boolean
  setIsAutoRunning: (running: boolean) => void
  steps: any[]
  setSteps: (steps: any[]) => void
}

export default function ControlPanel({
  inputArray,
  setInputArray,
  target,
  setTarget,
  currentStep,
  setCurrentStep,
  isAutoRunning,
  setIsAutoRunning,
  steps,
  setSteps,
}: ControlPanelProps) {
  const [arrayInput, setArrayInput] = useState<string>(inputArray.join(", "))
  const [error, setError] = useState<string>("")

  useEffect(() => {
    if (isAutoRunning && currentStep < steps.length) {
      const timer = setTimeout(() => {
        setCurrentStep(currentStep + 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (isAutoRunning && currentStep >= steps.length) {
      setIsAutoRunning(false)
    }
  }, [isAutoRunning, currentStep, steps.length, setCurrentStep, setIsAutoRunning])

  const generateBinarySearchSteps = (arr: number[], searchTarget: number) => {
    const generatedSteps = []
    let low = 0
    let high = arr.length - 1

    while (low <= high) {
      const mid = Math.floor((low + high) / 2)

      generatedSteps.push({
        low,
        high,
        mid,
        found: arr[mid] === searchTarget,
        notFound: false,
      })

      if (arr[mid] === searchTarget) {
        break
      } else if (arr[mid] < searchTarget) {
        low = mid + 1
      } else {
        high = mid - 1
      }
    }

    if (generatedSteps.length > 0) {
      const lastStep = generatedSteps[generatedSteps.length - 1]
      if (!lastStep.found) {
        lastStep.notFound = true
      }
    }

    return generatedSteps
  }

  const handleStartSearch = () => {
    setError("")
    const newSteps = generateBinarySearchSteps(inputArray, target)

    if (newSteps.length === 0) {
      setError("Invalid search parameters")
      return
    }

    setSteps(newSteps)
    setCurrentStep(0)
    setIsAutoRunning(false)
  }

  const handleArrayChange = () => {
    try {
      setError("")
      const parsed = arrayInput
        .split(",")
        .map((s) => Number.parseInt(s.trim(), 10))
        .filter((n) => !isNaN(n))

      if (parsed.length === 0) {
        setError("Please enter valid numbers")
        return
      }
      const sorted = [...parsed].sort((a, b) => a - b)
      setInputArray(sorted)
    } catch {
      setError("Invalid array format")
    }
  }

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleReset = () => {
    setCurrentStep(0)
    setIsAutoRunning(false)
    setSteps([])
  }

  return (
    <div className="space-y-6">
      <div className="bg-gray-900 rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-50">Array Input</h3>
        <div className="space-y-3">
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Enter array (comma separated):</label>
            <Input
              type="text"
              value={arrayInput}
              onChange={(e) => setArrayInput(e.target.value)}
              placeholder="e.g. 1, 5, 3, 9, 2"
              className="bg-gray-700 border-gray-600 text-gray-50 placeholder-gray-500"
            />
          </div>

          <Button onClick={handleArrayChange} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Update Array
          </Button>
        </div>
      </div>

      <div className="bg-gray-900 rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-50">Search Target</h3>
        <div className="space-y-3">
          <Input
            type="number"
            value={target}
            onChange={(e) => setTarget(Number(e.target.value))}
            placeholder="Enter target number"
            className="bg-gray-700 border-gray-600 text-gray-50 placeholder-gray-500"
          />

          <Button
            onClick={handleStartSearch}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
          >
            Start Search
          </Button>
        </div>
      </div>

      {steps.length > 0 && (
        <div className="bg-gray-900 rounded-lg p-6 space-y-4">
    

          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={handlePrevStep}
              disabled={currentStep === 0}
              className="bg-gray-700 hover:bg-gray-600 disabled:opacity-50 text-gray-50"
            >
              ←
            </Button>
            <Button
              onClick={handleNextStep}
              disabled={currentStep === steps.length - 1}
              className="bg-gray-700 hover:bg-gray-600 disabled:opacity-50 text-gray-50"
            >
              →
            </Button>
          </div>

          <Button
            onClick={() => setIsAutoRunning(!isAutoRunning)}
            className={`w-full ${
              isAutoRunning ? "bg-red-600 hover:bg-red-700" : "bg-purple-600 hover:bg-purple-700"
            } text-white font-semibold`}
          >
            {isAutoRunning ? "⏸ Pause" : "▶ Auto Run"}
          </Button>

          <Button onClick={handleReset} className="w-full bg-gray-700 hover:bg-gray-600 text-gray-50">
            Reset
          </Button>
        </div>
      )}

      {error && <div className="bg-red-900 border border-red-700 rounded-lg p-4 text-red-200 text-sm">{error}</div>}
    </div>
  )
}
