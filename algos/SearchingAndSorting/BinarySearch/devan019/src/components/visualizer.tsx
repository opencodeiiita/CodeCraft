"use client"

import { useEffect, useState } from "react"

interface Step {
  low: number
  high: number
  mid: number
  found?: boolean
  notFound?: boolean
}

interface ArrayVisualizerProps {
  array: number[]
  steps: Step[]
  currentStep: number
}

export default function ArrayVisualizer({ array, steps, currentStep }: ArrayVisualizerProps) {
  const [displaySteps, setDisplaySteps] = useState<Step | null>(null)

  useEffect(() => {
    if (steps.length > 0 && currentStep < steps.length) {
      setDisplaySteps(steps[currentStep])
    }
  }, [currentStep, steps])

  const getItemColor = (index: number) => {
    if (!displaySteps) return "bg-gray-700"

    if (displaySteps.found && displaySteps.mid === index) {
      return "bg-green-600 scale-110"
    }

    if (displaySteps.notFound) {
      return "bg-red-700"
    }

    if (index === displaySteps.mid) {
      return "bg-blue-600 scale-110"
    }

    if (index >= displaySteps.low && index <= displaySteps.high) {
      return "bg-gray-600"
    }

    return "bg-gray-800 opacity-40"
  }

  return (
    <div className="space-y-4">
      <div>

        <div className="bg-gray-900 rounded-lg p-6 min-h-48 flex flex-col justify-center">
          <div className="flex gap-2 justify-center flex-wrap">
            {array.map((num, idx) => (
              <div
                key={idx}
                className={`
                  w-14 h-14 flex items-center justify-center
                  rounded-lg font-bold text-sm
                  transition-all duration-300 transform
                  ${getItemColor(idx)}
                `}
              >
                {num}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-900 rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-50">Current Step</h3>
        {displaySteps ? (
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Low Index:</span>
              <span className="text-blue-400 font-mono font-bold">{displaySteps.low}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Mid Index:</span>
              <span className="text-blue-500 font-mono font-bold">{displaySteps.mid}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">High Index:</span>
              <span className="text-blue-400 font-mono font-bold">{displaySteps.high}</span>
            </div>
            <div className="pt-3 border-t border-gray-700">
              {displaySteps.found ? (
                <div className="text-green-400 font-semibold">✓ Found!</div>
              ) : displaySteps.notFound ? (
                <div className="text-red-400 font-semibold">✗ Not Found</div>
              ) : (
                <div className="text-yellow-400 font-semibold">Searching...</div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-gray-500">Click "Start Search" to begin</div>
        )}
      </div>
    </div>
  )
}
