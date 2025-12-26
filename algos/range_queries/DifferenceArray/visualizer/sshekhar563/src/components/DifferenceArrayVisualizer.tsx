'use client'

import { useState, useEffect, useCallback } from 'react'

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
  const [playSpeed, setPlaySpeed] = useState(1500)
  const [editingArray, setEditingArray] = useState(false)

  // Reset when array size changes
  useEffect(() => {
    if (!editingArray) {
      setInitialArray(Array(arraySize).fill(0))
    }
    setRangeUpdates([])
    setSteps([])
    setCurrentStep(0)
  }, [arraySize, editingArray])

  const nextStep = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1)
    }
  }, [currentStep, steps.length])

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }, [currentStep])

  const reset = useCallback(() => {
    setCurrentStep(0)
    setSteps([])
    setRangeUpdates([])
    setIsPlaying(false)
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (steps.length === 0) return
      switch (e.key) {
        case 'ArrowRight': e.preventDefault(); nextStep(); break
        case 'ArrowLeft': e.preventDefault(); prevStep(); break
        case ' ': e.preventDefault(); setIsPlaying(p => !p); break
        case 'r': case 'R': if (!e.ctrlKey && !e.metaKey) { e.preventDefault(); reset(); } break
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [steps, nextStep, prevStep, reset])

  // Auto-play
  useEffect(() => {
    if (!isPlaying || currentStep >= steps.length - 1) {
      if (currentStep >= steps.length - 1) setIsPlaying(false)
      return
    }
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) { setIsPlaying(false); return prev }
        return prev + 1
      })
    }, playSpeed)
    return () => clearInterval(interval)
  }, [isPlaying, currentStep, steps.length, playSpeed])

  // Load preset demos
  const loadPreset = (preset: number) => {
    reset()
    switch (preset) {
      case 1:
        setArraySize(8)
        setInitialArray(Array(8).fill(0))
        setTimeout(() => setRangeUpdates([{ L: 2, R: 5, X: 10 }]), 50)
        break
      case 2:
        setArraySize(8)
        setInitialArray(Array(8).fill(0))
        setTimeout(() => setRangeUpdates([{ L: 1, R: 4, X: 5 }, { L: 3, R: 6, X: 3 }]), 50)
        break
      case 3:
        setArraySize(10)
        setInitialArray(Array(10).fill(0))
        setTimeout(() => setRangeUpdates([{ L: 1, R: 3, X: 10 }, { L: 5, R: 7, X: -5 }, { L: 2, R: 8, X: 3 }]), 50)
        break
    }
  }

  const updateArrayValue = (index: number, value: string) => {
    const newArr = [...initialArray]
    newArr[index] = parseInt(value) || 0
    setInitialArray(newArr)
  }

  // Generate visualization steps
  const generateSteps = () => {
    const newSteps: Step[] = []
    const original = [...initialArray]
    const diff = [...initialArray]

    newSteps.push({
      type: 'initial',
      description: '📌 Step 1: Starting with the initial array. The difference array starts as a copy.',
      originalArray: [...original],
      diffArray: [...diff],
      finalArray: [...original],
    })

    rangeUpdates.forEach((update, idx) => {
      const { L, R, X } = update
      const prevDiff = [...(newSteps[newSteps.length - 1]?.diffArray || diff)]
      const newDiff = [...prevDiff]
      
      newDiff[L] += X
      if (R + 1 < arraySize) newDiff[R + 1] -= X

      newSteps.push({
        type: 'update',
        description: `🔄 Update ${idx + 1}: Add ${X} to range [${L}, ${R}] → diff[${L}] += ${X}${R + 1 < arraySize ? `, diff[${R + 1}] -= ${X}` : ''}`,
        originalArray: [...original],
        diffArray: [...newDiff],
        finalArray: [...original],
        highlightIndices: R + 1 < arraySize ? [L, R + 1] : [L],
        currentUpdate: update,
      })
    })

    const finalDiff = newSteps[newSteps.length - 1]?.diffArray || [...diff]
    const result = new Array(arraySize).fill(0)

    for (let i = 0; i < arraySize; i++) {
      result[i] = i === 0 ? finalDiff[0] : result[i - 1] + finalDiff[i]
      newSteps.push({
        type: 'prefix',
        description: i === 0
          ? `➕ Prefix Sum: result[0] = diff[0] = ${result[0]}`
          : `➕ Prefix Sum: result[${i}] = result[${i - 1}] + diff[${i}] = ${result[i - 1]} + ${finalDiff[i]} = ${result[i]}`,
        originalArray: [...original],
        diffArray: [...finalDiff],
        finalArray: [...result],
        prefixIndex: i,
      })
    }

    newSteps.push({
      type: 'final',
      description: '✅ Complete! All range updates have been applied using the difference array technique.',
      originalArray: [...original],
      diffArray: [...finalDiff],
      finalArray: [...result],
    })

    setSteps(newSteps)
    setCurrentStep(0)
  }

  const addRangeUpdate = () => {
    const L = parseInt(newL), R = parseInt(newR), X = parseInt(newX)
    if (isNaN(L) || isNaN(R) || isNaN(X)) { alert('Enter valid numbers'); return }
    if (L < 0 || R >= arraySize || L > R) { alert(`Invalid range: 0 ≤ L ≤ R < ${arraySize}`); return }
    setRangeUpdates([...rangeUpdates, { L, R, X }])
    setNewL(''); setNewR(''); setNewX('')
  }

  const removeUpdate = (index: number) => setRangeUpdates(rangeUpdates.filter((_, i) => i !== index))

  const getArrayColor = (value: number) => {
    if (value === 0) return 'bg-slate-100 border-slate-300 text-slate-700'
    if (value > 0) return 'bg-emerald-100 border-emerald-400 text-emerald-800'
    return 'bg-rose-100 border-rose-400 text-rose-800'
  }

  const currentStepData = steps[currentStep]
  const naiveOps = rangeUpdates.reduce((sum, u) => sum + (u.R - u.L + 1), 0)
  const diffOps = rangeUpdates.length * 2 + arraySize


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            🎯 Difference Array Visualizer
          </h1>
          <p className="text-slate-600">
            Learn how to apply multiple range updates efficiently using prefix sums
          </p>
          <p className="text-xs text-slate-400 mt-2">
            ⌨️ Shortcuts: ← → Navigate | Space Play/Pause | R Reset
          </p>
        </header>

        {/* Quick Demos */}
        <section className="bg-white rounded-xl shadow-md p-5 mb-6">
          <h2 className="text-lg font-semibold text-slate-700 mb-3">🚀 Quick Demos</h2>
          <div className="flex gap-3 flex-wrap">
            {[
              { id: 1, label: 'Basic Update', color: 'bg-blue-500 hover:bg-blue-600' },
              { id: 2, label: 'Overlapping Updates', color: 'bg-purple-500 hover:bg-purple-600' },
              { id: 3, label: 'Complex Pattern', color: 'bg-indigo-500 hover:bg-indigo-600' },
            ].map(demo => (
              <button
                key={demo.id}
                onClick={() => loadPreset(demo.id)}
                disabled={steps.length > 0}
                className={`px-4 py-2 text-white rounded-lg transition disabled:bg-gray-300 disabled:cursor-not-allowed ${demo.color}`}
              >
                Demo {demo.id}: {demo.label}
              </button>
            ))}
          </div>
        </section>

        {/* Configuration */}
        <section className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-slate-700 mb-4">⚙️ Configuration</h2>

          {/* Array Size */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Array Size: <span className="font-bold text-blue-600">{arraySize}</span>
            </label>
            <input
              type="range" min="4" max="12" value={arraySize}
              onChange={e => { setArraySize(parseInt(e.target.value)); setEditingArray(false) }}
              disabled={steps.length > 0}
              className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer accent-blue-500"
            />
          </div>

          {/* Initial Array */}
          <div className="mb-5">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-slate-600">Initial Array</label>
              <button
                onClick={() => setEditingArray(!editingArray)}
                disabled={steps.length > 0}
                className={`text-xs px-3 py-1 rounded transition ${editingArray ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-700'} disabled:opacity-50`}
              >
                {editingArray ? '✓ Done' : '✏️ Edit'}
              </button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {initialArray.map((val, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <span className="text-xs text-slate-400 mb-1">{idx}</span>
                  {editingArray ? (
                    <input
                      type="number" value={val}
                      onChange={e => updateArrayValue(idx, e.target.value)}
                      className="w-14 h-12 text-center border-2 rounded-lg font-bold border-blue-300 focus:border-blue-500 outline-none"
                    />
                  ) : (
                    <div className={`w-14 h-12 flex items-center justify-center border-2 rounded-lg font-bold ${getArrayColor(val)}`}>
                      {val}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Range Updates Input */}
          <div className="mb-5">
            <h3 className="text-sm font-medium text-slate-600 mb-2">Add Range Update</h3>
            <div className="flex gap-2 flex-wrap items-center">
              <input type="number" placeholder="L" value={newL} onChange={e => setNewL(e.target.value)}
                disabled={steps.length > 0}
                className="w-20 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none disabled:bg-gray-100" />
              <input type="number" placeholder="R" value={newR} onChange={e => setNewR(e.target.value)}
                disabled={steps.length > 0}
                className="w-20 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none disabled:bg-gray-100" />
              <input type="number" placeholder="X" value={newX} onChange={e => setNewX(e.target.value)}
                disabled={steps.length > 0}
                className="w-20 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none disabled:bg-gray-100" />
              <button onClick={addRangeUpdate} disabled={steps.length > 0}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed">
                + Add
              </button>
            </div>
          </div>

          {/* Updates List */}
          {rangeUpdates.length > 0 && (
            <div className="mb-5 space-y-2">
              {rangeUpdates.map((u, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border">
                  <span className="font-mono text-slate-700">
                    Update [{u.L}, {u.R}] += <span className={u.X >= 0 ? 'text-emerald-600' : 'text-rose-600'}>{u.X}</span>
                  </span>
                  <button onClick={() => removeUpdate(idx)} disabled={steps.length > 0}
                    className="text-rose-500 hover:text-rose-700 disabled:text-gray-300">✕</button>
                </div>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 flex-wrap">
            <button onClick={generateSteps} disabled={rangeUpdates.length === 0 || steps.length > 0}
              className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed">
              ▶ Visualize
            </button>
            <button onClick={reset} disabled={steps.length === 0}
              className="px-6 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed">
              ↺ Reset
            </button>
          </div>

          {/* Complexity Comparison */}
          {rangeUpdates.length > 0 && (
            <div className="mt-5 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-800 mb-2">⚡ Complexity Comparison</h4>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-rose-600">{naiveOps}</div>
                  <div className="text-xs text-slate-500">Naive O(q×n)</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-emerald-600">{diffOps}</div>
                  <div className="text-xs text-slate-500">Diff Array O(q+n)</div>
                </div>
              </div>
              <div className="text-center mt-2 text-sm font-semibold text-emerald-700">
                🚀 {(naiveOps / diffOps).toFixed(1)}x faster!
              </div>
            </div>
          )}
        </section>


        {/* Visualization Area */}
        {steps.length > 0 && currentStepData && (
          <section className="bg-white rounded-xl shadow-md p-6 mb-6">
            {/* Step Description */}
            <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
              <p className="text-lg font-medium text-slate-800">{currentStepData.description}</p>
            </div>

            {/* Arrays Display */}
            <div className="space-y-8">
              {/* Original Array */}
              <div>
                <h3 className="text-lg font-semibold text-slate-700 mb-3">📊 Original Array</h3>
                <div className="flex gap-2 flex-wrap">
                  {currentStepData.originalArray.map((val, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <span className="text-xs text-slate-400 mb-1">{idx}</span>
                      <div className={`w-14 h-14 flex items-center justify-center border-2 rounded-lg font-bold text-lg ${getArrayColor(val)}`}>
                        {val}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Difference Array */}
              <div>
                <h3 className="text-lg font-semibold text-slate-700 mb-1">🔧 Difference Array</h3>
                <p className="text-xs text-slate-500 mb-3">Stores range update markers</p>
                <div className="flex gap-2 flex-wrap">
                  {currentStepData.diffArray.map((val, idx) => {
                    const isHighlighted = currentStepData.highlightIndices?.includes(idx)
                    return (
                      <div key={idx} className="flex flex-col items-center">
                        <span className="text-xs text-slate-400 mb-1">{idx}</span>
                        <div className={`w-14 h-14 flex items-center justify-center border-2 rounded-lg font-bold text-lg transition-all duration-300 ${
                          isHighlighted
                            ? 'border-amber-500 bg-amber-100 text-amber-800 ring-4 ring-amber-300 scale-110'
                            : getArrayColor(val)
                        }`}>
                          {val}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Final Array */}
              <div>
                <h3 className="text-lg font-semibold text-slate-700 mb-1">✨ Final Array</h3>
                <p className="text-xs text-slate-500 mb-3">Result after prefix sum</p>
                <div className="flex gap-2 flex-wrap">
                  {currentStepData.finalArray.map((val, idx) => {
                    const isCurrent = currentStepData.prefixIndex === idx
                    const isComputed = currentStepData.prefixIndex !== undefined && idx <= currentStepData.prefixIndex
                    return (
                      <div key={idx} className="flex flex-col items-center">
                        <span className="text-xs text-slate-400 mb-1">{idx}</span>
                        <div className={`w-14 h-14 flex items-center justify-center border-2 rounded-lg font-bold text-lg transition-all duration-300 ${
                          isCurrent
                            ? 'border-violet-500 bg-violet-100 text-violet-800 ring-4 ring-violet-300 scale-110 animate-pulse'
                            : isComputed
                            ? 'border-emerald-500 bg-emerald-100 text-emerald-800'
                            : getArrayColor(val)
                        }`}>
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
              <div className="flex gap-2">
                <button onClick={prevStep} disabled={currentStep === 0}
                  className="px-5 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed">
                  ← Prev
                </button>
                <button onClick={nextStep} disabled={currentStep === steps.length - 1}
                  className="px-5 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed">
                  Next →
                </button>
                <button onClick={() => setIsPlaying(!isPlaying)} disabled={currentStep === steps.length - 1}
                  className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed">
                  {isPlaying ? '⏸ Pause' : '▶ Play'}
                </button>
              </div>
              <div className="flex items-center gap-3">
                <select value={playSpeed} onChange={e => setPlaySpeed(Number(e.target.value))}
                  className="px-3 py-2 border rounded-lg text-sm">
                  <option value={2500}>Slow</option>
                  <option value={1500}>Medium</option>
                  <option value={700}>Fast</option>
                </select>
                <span className="text-slate-600 font-medium">
                  Step {currentStep + 1} / {steps.length}
                </span>
              </div>
            </div>
          </section>
        )}

        {/* How It Works */}
        <section className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-slate-700 mb-4">📚 How Difference Arrays Work</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">1️⃣ Range Update</h3>
              <p className="text-sm text-slate-600">
                To add X to range [L, R]: set <code className="bg-blue-100 px-1 rounded">diff[L] += X</code> and <code className="bg-blue-100 px-1 rounded">diff[R+1] -= X</code>
              </p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-lg">
              <h3 className="font-semibold text-emerald-800 mb-2">2️⃣ Prefix Sum</h3>
              <p className="text-sm text-slate-600">
                Apply prefix sum on diff array: <code className="bg-emerald-100 px-1 rounded">result[i] = result[i-1] + diff[i]</code>
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-2">⏱️ Time Complexity</h3>
              <p className="text-sm text-slate-600">
                O(q + n) instead of O(q × n) for q updates on array of size n
              </p>
            </div>
            <div className="p-4 bg-amber-50 rounded-lg">
              <h3 className="font-semibold text-amber-800 mb-2">💡 Use Case</h3>
              <p className="text-sm text-slate-600">
                Perfect for batch range updates followed by a single query phase
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center mt-8 text-sm text-slate-500">
          Built by <span className="font-semibold">sshekhar563</span> • CodeCraft
        </footer>
      </div>
    </div>
  )
}
