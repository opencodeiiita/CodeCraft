# Difference Array Visualizer

An interactive visualizer to help understand range updates using difference arrays and prefix sums.

## Features

- 🎯 **Interactive Array Configuration** - Set array size and initial values
- 🔄 **Multiple Range Updates** - Add multiple (L, R, X) updates
- 📊 **Step-by-Step Visualization** - Watch how difference array technique works
- ⚡ **Complexity Comparison** - See the efficiency gain over naive approach
- 🚀 **Quick Demos** - Pre-built examples to get started
- ⌨️ **Keyboard Shortcuts** - Navigate with arrow keys, space to play/pause

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the visualizer.

## How Difference Arrays Work

1. **Range Update**: To add X to range [L, R]:
   - `diff[L] += X`
   - `diff[R+1] -= X`

2. **Prefix Sum**: Apply prefix sum to get final array:
   - `result[i] = result[i-1] + diff[i]`

**Time Complexity**: O(q + n) instead of O(q × n)

## Author

**Siddhant Shekhar** ([@sshekhar563](https://github.com/sshekhar563))
