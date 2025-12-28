"use client"

export default function AlgorithmExplanation() {
  return (
    <div className="bg-gray-800 rounded-lg p-6 space-y-2 text-sm font-mono text-gray-300">
      <p>mid = ⌊(low + high) / 2⌋</p>
      <p>If arr[mid] == target → found</p>
      <p>If arr[mid] &lt; target → low = mid + 1</p>
      <p>If arr[mid] &gt; target → high = mid - 1</p>
    </div>
  )
}
