'use client'

import { useState, useEffect } from 'react'

interface RangeUpdate {
  L: number
  R: number
  X: number
}

interface Step {
  type: 'initial' | 'update' | 'prefix' | 'final'
  description: string
  originalArray: number[]
  diffArray: number[]
  finalArray: number[]
  highlightIndices?: number[]
  currentUpdate?: RangeUpdate
  prefixIndex?: number
}

export default function DifferenceArrayVisualizer() {
  const [arraySize, setArraySize] = useState(8)
  const [initialArray, setInitialArray] = useState<number[]>(Array(8).fill(0))
  const [rangeUpdates, setRangeUpdates] = useState<RangeUpdate[]>([])
  const [newL, setNewL] = useState('')
  const [newR, setNewR] = useState('')
  const [newX, setNewX] = useState('')
  const [steps, setSteps] = useState<Step[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [playSpeed, setPlaySpeed] = useState(1500)
  const [showCode, setShowCode] = useState(false)
  const [showComparison, setShowComparison] = useState(false)
  const [editingInitialArray, setEditingInitialArray] = useState(false)

  // Initialize array when size changes
  useEffect(() => {
    if (!editingInitialArray) {
      setInitialArray(Array(arraySize).fill(0))
    }
    setRangeUpdates([])
    setSteps([])
    setCurrentStep(0)
  }, [arraySize])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (steps.length === 0) return
      
      switch(e.key) {
        case 'ArrowRight':
          e.preventDefault()
          nextStep()
          break
        case 'ArrowLeft':
          e.preventDefault()
          prevStep()
          break
        case ' ':
          e.preventDefault()
          setIsPlaying(!isPlaying)
          break
        case 'r':
        case 'R':
          if (e.ctrlKey || e.metaKey) return
          e.preventDefault()
          reset()
          break
      }
    }
    
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [steps, currentStep, isPlaying])

  // Preset examples
  const loadPreset = (preset: number) => {
    setRangeUpdates([])
    setSteps([])
    setCurrentStep(0)
    
    switch(preset) {
      case 1: // Basic Update
        setArraySize(8)
        setInitialArray(Array(8).fill(0))
        setTimeout(() => {
          setRangeUpdates([{ L: 2, R: 5, X: 10 }])
        }, 100)
        break
      case 2: // Overlapping Updates
        setArraySize(8)
        setInitialArray(Array(8).fill(0))
        setTimeout(() => {
          setRangeUpdates([
            { L: 1, R: 4, X: 5 },
            { L: 3, R: 6, X: 3 }
          ])
        }, 100)
        break
      case 3: // Complex Pattern
        setArraySize(10)
        setInitialArray(Array(10).fill(0))
        setTimeout(() => {
          setRangeUpdates([
            { L: 1, R: 3, X: 10 },
            { L: 5, R: 7, X: -5 },
            { L: 2, R: 8, X: 3 }
          ])
        }, 100)
        break
    }
  }

  // Update initial array value
  const updateInitialArrayValue = (index: number, value: string) => {
    const newArray = [...initialArray]
    newArray[index] = parseInt(value) || 0
    setInitialArray(newArray)
  }

  // Generate steps for visualization
  const generateSteps = () => {
    const newSteps: Step[] = []
    
    // Step 1: Show initial array
    const original = [...initialArray]
    const diff = [...initialArray]
    
    newSteps.push({
      type: 'initial',
      description: 'Step 1: Initial Array - This is our starting array',
      originalArray: [...original],
      diffArray: [...diff],
      finalArray: [...original],
    })

    // Process each range update
    rangeUpdates.forEach((update, idx) => {
      const { L, R, X } = update
      
      // Show the update being applied to difference array
      const prevDiff = [...(newSteps[newSteps.length - 1]?.diffArray || diff)]
      const newDiff = [...prevDiff]
      
      newDiff[L] += X
      if (R + 1 < arraySize) {
        newDiff[R + 1] -= X
      }
      
      newSteps.push({
        type: 'update',
        description: `Step ${newSteps.length + 1}: Apply update [${L}, ${R}] += ${X}. Mark diff[${L}] += ${X}${R + 1 < arraySize ? ` and diff[${R + 1}] -= ${X}` : ''}`,
        originalArray: [...original],
        diffArray: [...newDiff],
        finalArray: [...original],
        highlightIndices: R + 1 < arraySize ? [L, R + 1] : [L],
        currentUpdate: update,
      })
    })

    // Apply prefix sum to get final array
    const finalDiff = newSteps[newSteps.length - 1]?.diffArray || [...diff]
    const result = new Array(arraySize).fill(0)
    
    // Show prefix sum process step by step
    for (let i = 0; i < arraySize; i++) {
      if (i === 0) {
        result[0] = finalDiff[0]
      } else {
        result[i] = result[i - 1] + finalDiff[i]
      }
      
      newSteps.push({
        type: 'prefix',
        description: i === 0 
          ? `Step ${newSteps.length + 1}: Prefix Sum - result[0] = diff[0] = ${result[0]}`
          : `Step ${newSteps.length + 1}: Prefix Sum - result[${i}] = result[${i-1}] + diff[${i}] = ${result[i - 1]} + ${finalDiff[i]} = ${result[i]}`,
        originalArray: [...original],
        diffArray: [...finalDiff],
        finalArray: [...result],
        prefixIndex: i,
      })
    }

    // Final result
    newSteps.push({
      type: 'final',
      description: `Step ${newSteps.length + 1}: Final Array - All range updates applied!`,
      originalArray: [...original],
      diffArray: [...finalDiff],
      finalArray: [...result],
    })

    setSteps(newSteps)
    setCurrentStep(0)
  }

  const addRangeUpdate = () => {
    const L = parseInt(newL)
    const R = parseInt(newR)
    const X = parseInt(newX)
    
    if (isNaN(L) || isNaN(R) || isNaN(X)) {
      alert('Please enter valid numbers')
      return
    }
    
    if (L < 0 || R >= arraySize || L > R) {
      alert(`Invalid range. L and R must be between 0 and ${arraySize - 1}, and L ≤ R`)
      return
    }
    
    setRangeUpdates([...rangeUpdates, { L, R, X }])
    setNewL('')
    setNewR('')
    setNewX('')
  }

  const removeUpdate = (index: number) => {
    setRangeUpdates(rangeUpdates.filter((_, i) => i !== index))
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const reset = () => {
    setCurrentStep(0)
    setSteps([])
    setRangeUpdates([])
  }

  // Auto-play functionality
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying && currentStep < steps.length - 1) {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false)
            return prev
          }
          return prev + 1
        })
      }, playSpeed)
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false)
    }
    return () => clearInterval(interval)
  }, [isPlaying, currentStep, steps.length, playSpeed])

  const currentStepData = steps[currentStep]

  const getArrayColor = (value: number, isDark = darkMode) => {
    if (isDark) {
      if (value === 0) return 'bg-gray-700 border-gray-600 text-gray-100'
      if (value > 0) return 'bg-green-900 border-green-600 text-green-100'
      return 'bg-red-900 border-red-600 text-red-100'
    }
    if (value === 0) return 'bg-gray-100 border-gray-300'
    if (value > 0) return 'bg-green-100 border-green-400'
    return 'bg-red-100 border-red-400'
  }

  // Calculate comparison metrics
  const naiveOperations = rangeUpdates.reduce((sum, u) => sum + (u.R - u.L + 1), 0)
  const diffArrayOperations = rangeUpdates.length * 2 + arraySize

  return (
    <div className={`min-h-screen p-4 md:p-8 transition-colors ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-b from-slate-50 to-slate-100'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 relative">
        <div className="absolute right-0 top-0 flex gap-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              darkMode ? 'bg-gray-800 text-yellow-400 border border-gray-600' : 'bg-slate-200 text-slate-700'
            }`}
            title="Toggle Dark Mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
          <button
            onClick={() => setShowCode(!showCode)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              darkMode ? 'bg-gray-800 text-gray-100 border border-gray-600' : 'bg-slate-200 text-slate-700'
            }`}
            title="Toggle Code View"
          >
            {'</>'}
          </button>
        </div>
        <h1 className={`text-4xl font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-slate-800'}`}>
          Difference Array Visualizer
        </h1>
        <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-slate-600'}`}>
          Understand range updates using difference arrays and prefix sums
        </p>
        <div className="mt-4 text-xs text-gray-500">
          ⌨️ Shortcuts: ← → (Navigate) | Space (Play/Pause) | R (Reset)
        </div>
      </div>

      {/* Preset Examples */}
      <div className={`rounded-lg shadow-lg p-4 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-blue-50 to-purple-50'}`}>
        <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-gray-100' : 'text-slate-700'}`}>
          🚀 Quick Demos
        </h3>
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => loadPreset(1)}
            disabled={steps.length > 0}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            Demo 1: Basic Update
          </button>
          <button
            onClick={() => loadPreset(2)}
            disabled={steps.length > 0}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            Demo 2: Overlapping Updates
          </button>
          <button
            onClick={() => loadPreset(3)}
            disabled={steps.length > 0}
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            Demo 3: Complex Pattern
          </button>
        </div>
      </div>

      {/* Configuration Panel */}
      <div className={`rounded-lg shadow-lg p-6 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-gray-100' : 'text-slate-700'}`}>Configuration</h2>
        
        {/* Array Size */}
        <div className="mb-6">
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-slate-700'}`}>
            Array Size (n): {arraySize}
          </label>
          <input
            type="range"
            min="4"
            max="12"
            value={arraySize}
            onChange={(e) => {
              const newSize = parseInt(e.target.value)
              setArraySize(newSize)
              setEditingInitialArray(false)
            }}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
            disabled={steps.length > 0}
          />
        </div>

        {/* Initial Array Editor */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-slate-700'}`}>
              Initial Array Values
            </label>
            <button
              onClick={() => setEditingInitialArray(!editingInitialArray)}
              disabled={steps.length > 0}
              className={`text-xs px-3 py-1 rounded ${
                editingInitialArray 
                  ? 'bg-green-500 text-white' 
                  : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-slate-200 text-slate-700'
              } disabled:opacity-50`}
            >
              {editingInitialArray ? '✓ Done' : '✏️ Edit'}
            </button>
          </div>
          {editingInitialArray ? (
            <div className="flex gap-2 flex-wrap">
              {initialArray.map((val, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="text-xs text-gray-500 mb-1">{idx}</div>
                  <input
                    type="number"
                    value={val}
                    onChange={(e) => updateInitialArrayValue(idx, e.target.value)}
                    className={`w-16 h-12 text-center border-2 rounded-lg font-bold ${
                      darkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300'
                    }`}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex gap-2 flex-wrap">
              {initialArray.map((val, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="text-xs text-gray-500 mb-1">{idx}</div>
                  <div className={`w-16 h-12 flex items-center justify-center border-2 rounded-lg font-bold ${getArrayColor(val)}`}>
                    {val}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Range Updates */}
        <div className="mb-4">
          <h3 className={`text-lg font-medium mb-3 ${darkMode ? 'text-gray-100' : 'text-slate-700'}`}>Range Updates</h3>
          <div className="flex gap-3 mb-3 flex-wrap">
            <input
              type="number"
              placeholder="L (start)"
              value={newL}
              onChange={(e) => setNewL(e.target.value)}
              className={`px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                darkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'border-slate-300'
              }`}
              disabled={steps.length > 0}
            />
            <input
              type="number"
              placeholder="R (end)"
              value={newR}
              onChange={(e) => setNewR(e.target.value)}
              className={`px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                darkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'border-slate-300'
              }`}
              disabled={steps.length > 0}
            />
            <input
              type="number"
              placeholder="X (value)"
              value={newX}
              onChange={(e) => setNewX(e.target.value)}
              className={`px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                darkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'border-slate-300'
              }`}
              disabled={steps.length > 0}
            />
              placeholder="R (end)"
              value={newR}
              onChange={(e) => setNewR(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={steps.length > 0}
            />
            <input
              type="number"
              placeholder="X (value)"
              value={newX}
              onChange={(e) => setNewX(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={steps.length > 0}
            />
            <button
              onClick={addRangeUpdate}
              disabled={steps.length > 0}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              Add Update
            </button>
          </div>

          {/* Display added updates */}
          <div className="space-y-2">
            {rangeUpdates.map((update, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  darkMode ? 'bg-gray-700 border-gray-600' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <span className={`font-mono ${darkMode ? 'text-gray-100' : ''}`}>
                  Update [{update.L}, {update.R}] += {update.X}
                </span>
                <button
                  onClick={() => removeUpdate(idx)}
                  disabled={steps.length > 0}
                  className="text-red-600 hover:text-red-800 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Animation Speed Control */}
        {steps.length > 0 && (
          <div className="mb-4">
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-slate-700'}`}>
              Animation Speed: {playSpeed === 500 ? 'Fast' : playSpeed === 1500 ? 'Medium' : 'Slow'}
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setPlaySpeed(2500)}
                className={`px-4 py-2 rounded-lg ${playSpeed === 2500 ? 'bg-blue-600 text-white' : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-slate-200'}`}
              >
                Slow
              </button>
              <button
                onClick={() => setPlaySpeed(1500)}
                className={`px-4 py-2 rounded-lg ${playSpeed === 1500 ? 'bg-blue-600 text-white' : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-slate-200'}`}
              >
                Medium
              </button>
              <button
                onClick={() => setPlaySpeed(500)}
                className={`px-4 py-2 rounded-lg ${playSpeed === 500 ? 'bg-blue-600 text-white' : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-slate-200'}`}
              >
                Fast
              </button>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 flex-wrap items-center">
          <button
            onClick={generateSteps}
            disabled={rangeUpdates.length === 0 || steps.length > 0}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            Visualize
          </button>
          <button
            onClick={reset}
            disabled={steps.length === 0}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            Reset
          </button>
          {rangeUpdates.length > 0 && (
            <button
              onClick={() => setShowComparison(!showComparison)}
              className={`px-4 py-2 rounded-lg ${
                showComparison ? 'bg-purple-600 text-white' : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-slate-200'
              }`}
            >
              {showComparison ? '📊 Hide' : '📊 Show'} Complexity
            </button>
          )}
        </div>

        {/* Complexity Comparison */}
        {showComparison && rangeUpdates.length > 0 && (
          <div className={`mt-4 p-4 rounded-lg border-2 ${darkMode ? 'bg-gray-700 border-purple-500' : 'bg-purple-50 border-purple-300'}`}>
            <h4 className={`font-semibold mb-2 ${darkMode ? 'text-gray-100' : 'text-purple-900'}`}>
              ⚡ Complexity Comparison
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Naive Approach</div>
                <div className={`text-2xl font-bold ${darkMode ? 'text-red-400' : 'text-red-600'}`}>{naiveOperations}</div>
                <div className="text-xs text-gray-500">operations (O(q×n))</div>
              </div>
              <div>
                <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Difference Array</div>
                <div className={`text-2xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>{diffArrayOperations}</div>
                <div className="text-xs text-gray-500">operations (O(q+n))</div>
              </div>
            </div>
            <div className={`mt-2 text-sm font-semibold ${darkMode ? 'text-green-400' : 'text-green-700'}`}>
              ⚡ {Math.round((naiveOperations / diffArrayOperations) * 10) / 10}x faster!
            </div>
          </div>
        )}
      </div>

      {/* Code Display */}
      {showCode && (
        <div className={`rounded-lg shadow-lg p-6 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-gray-100' : 'text-slate-700'}`}>
            📝 Algorithm Code
          </h2>
          <div className={`font-mono text-sm p-4 rounded-lg overflow-x-auto ${darkMode ? 'bg-gray-900 text-green-400' : 'bg-slate-900 text-green-300'}`}>
            <pre>{`// Apply Range Updates
for (let i = 0; i < updates.length; i++) {
    let L = updates[i].L;
    let R = updates[i].R;
    let X = updates[i].X;
    
    diff[L] += X;           // Mark start of range
    if (R + 1 < n) {
        diff[R + 1] -= X;   // Mark end of range
    }
}

// Apply Prefix Sum to get final array
result[0] = diff[0];
for (let i = 1; i < n; i++) {
    result[i] = result[i - 1] + diff[i];
}

// Time Complexity: O(q + n)
// Space Complexity: O(n)`}</pre>
          </div>
        </div>
      )}

      {/* Visualization Area */}
      {steps.length > 0 && currentStepData && (
        <div className={`rounded-lg shadow-lg p-6 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          {/* Step Description */}
          <div className={`mb-6 p-4 border-l-4 border-blue-500 rounded ${darkMode ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
            <p className={`text-lg font-medium ${darkMode ? 'text-gray-100' : 'text-slate-800'}`}>
              {currentStepData.description}
            </p>
          </div>

          {/* Arrays Display */}
          <div className="space-y-8">
            {/* Original Array */}
            <div>
              <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-gray-100' : 'text-slate-700'}`}>
                Original Array
              </h3>
              <div className="flex gap-2 flex-wrap">
                {currentStepData.originalArray.map((val, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div className={`text-xs mb-1 ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>{idx}</div>
                    <div
                      className={`w-16 h-16 flex items-center justify-center border-2 rounded-lg font-bold text-lg ${getArrayColor(val)}`}
                    >
                      {val}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Difference Array */}
            <div>
              <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-gray-100' : 'text-slate-700'}`}>
                Difference Array
                <span className={`ml-2 text-sm font-normal ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>
                  (Used for range updates)
                </span>
              </h3>
              <div className="flex gap-2 flex-wrap">
                {currentStepData.diffArray.map((val, idx) => {
                  const isHighlighted = currentStepData.highlightIndices?.includes(idx)
                  return (
                    <div key={idx} className="flex flex-col items-center">
                      <div className={`text-xs mb-1 ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>{idx}</div>
                      <div
                        className={`w-16 h-16 flex items-center justify-center border-2 rounded-lg font-bold text-lg transition-all ${
                          isHighlighted
                            ? 'border-yellow-500 bg-yellow-100 text-gray-900 ring-4 ring-yellow-300 scale-110'
                            : getArrayColor(val)
                        }`}
                      >
                        {val}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Final Array (Result after prefix sum) */}
            <div>
              <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-gray-100' : 'text-slate-700'}`}>
                Final Array
                <span className={`ml-2 text-sm font-normal ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>
                  (After applying prefix sum)
                </span>
              </h3>
              <div className="flex gap-2 flex-wrap">
                {currentStepData.finalArray.map((val, idx) => {
                  const isCurrentPrefix = currentStepData.prefixIndex === idx
                  const isComputed = currentStepData.prefixIndex !== undefined && idx <= currentStepData.prefixIndex
                  return (
                    <div key={idx} className="flex flex-col items-center">
                      <div className={`text-xs mb-1 ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>{idx}</div>
                      <div
                        className={`w-16 h-16 flex items-center justify-center border-2 rounded-lg font-bold text-lg transition-all ${
                          isCurrentPrefix
                            ? 'border-purple-500 bg-purple-100 text-gray-900 ring-4 ring-purple-300 scale-110 animate-pulse-slow'
                            : isComputed
                            ? 'border-green-500 bg-green-100 text-gray-900'
                            : getArrayColor(val)
                        }`}
                      >
                        {val}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="mt-8 flex items-center justify-between flex-wrap gap-4">
            <div className="flex gap-3">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`px-6 py-2 text-white rounded-lg disabled:cursor-not-allowed transition-colors ${
                  darkMode ? 'bg-gray-600 hover:bg-gray-500 disabled:bg-gray-700' : 'bg-slate-600 hover:bg-slate-700 disabled:bg-gray-300'
                }`}
              >
                ← Previous
              </button>
              <button
                onClick={nextStep}
                disabled={currentStep === steps.length - 1}
                className="px-6 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                ← Previous
              </button>
              <button
                onClick={nextStep}
                disabled={currentStep === steps.length - 1}
                className={`px-6 py-2 text-white rounded-lg disabled:cursor-not-allowed transition-colors ${
                  darkMode ? 'bg-gray-600 hover:bg-gray-500 disabled:bg-gray-700' : 'bg-slate-600 hover:bg-slate-700 disabled:bg-gray-300'
                }`}
              >
                Next →
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                disabled={currentStep === steps.length - 1}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {isPlaying ? '⏸ Pause' : '▶ Play'}
              </button>
            </div>
            <div className={`font-medium ${darkMode ? 'text-gray-300' : 'text-slate-600'}`}>
              Step {currentStep + 1} of {steps.length}
            </div>
          </div>
        </div>
      )}

      {/* Information Panel */}
      <div className={`rounded-lg shadow-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-gray-100' : 'text-slate-700'}`}>
          How Difference Arrays Work
        </h2>
        <div className={`space-y-4 ${darkMode ? 'text-gray-300' : 'text-slate-600'}`}>
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
            <h3 className={`font-semibold mb-2 ${darkMode ? 'text-blue-300' : 'text-slate-800'}`}>1. Initialize</h3>
            <p>Start with your original array and create a difference array (initially same as original).</p>
          </div>
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-green-900/30' : 'bg-green-50'}`}>
            <h3 className={`font-semibold mb-2 ${darkMode ? 'text-green-300' : 'text-slate-800'}`}>2. Apply Updates</h3>
            <p>For each range update [L, R] += X:</p>
            <ul className="list-disc ml-6 mt-2">
              <li>Add X to diff[L]</li>
              <li>Subtract X from diff[R+1] (if R+1 exists)</li>
            </ul>
            <p className="mt-2 text-sm italic">This makes range updates O(1) instead of O(n)!</p>
          </div>
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-purple-900/30' : 'bg-purple-50'}`}>
            <h3 className={`font-semibold mb-2 ${darkMode ? 'text-purple-300' : 'text-slate-800'}`}>3. Compute Final Array</h3>
            <p>Apply prefix sum on the difference array to get the final result.</p>
            <p className="mt-2 font-mono text-sm">result[i] = result[i-1] + diff[i]</p>
          </div>
          <div className={`p-4 rounded-lg border-l-4 ${darkMode ? 'bg-yellow-900/30 border-yellow-500' : 'bg-yellow-50 border-yellow-500'}`}>
            <h3 className={`font-semibold mb-2 ${darkMode ? 'text-yellow-300' : 'text-slate-800'}`}>💡 Why It's Efficient</h3>
            <p>Multiple range updates in O(1) each, then one O(n) prefix sum at the end.</p>
            <p className="mt-2">
              <strong>Time Complexity:</strong> O(q + n) where q = number of updates
            </p>
            <p className="mt-1">
              <strong>vs Naive Approach:</strong> O(q × n)
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={`mt-8 text-center text-sm ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>
        <p>Created by hsd2514 | Part of CodeCraft Range Queries Collection</p>
      </div>
      </div>
    </div>
  )
}
