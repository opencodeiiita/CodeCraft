# ⚡ Difference Array Visualizer

> A high-performance, cyberpunk-themed visualizer for range update algorithms.

---

### ✨ Core Features

| Feature               | Description                                                     |
| :-------------------- | :-------------------------------------------------------------- |
| 🚀 **O(1) Updates**   | Visualize constant-time range updates in the difference buffer. |
| 🔄 **Linear Rebuild** | Watch the Θ(N) prefix-sum pass reconstruct the final state.     |
| 🛠️ **INIT Protocol**  | Supply custom base arrays for real-world simulation.            |
| 📊 **Efficiency HUD** | Real-time tracking of operations saved vs. naive methods.       |
| 📟 **Step Analyst**   | Manual & Auto playback with mathematical step-by-step logs.     |

---

### 🔥 Added Enhancements (Extra Features)

- **Interactive Range Selection**: Drag-and-drop across array cells to dynamically set the update range (`L` to `R`).
- **Naive vs. Optimized Simulation**: A switchable protocol mode to visually compare O(1) marker updates against O(N) linear updates.
- **Manual Playback Console**: Complete VCR-style controls (`Prev`, `Play`, `Next`) for granular algorithm inspection.
- **Dynamic Logic Logs**: Real-time mathematical trace of the reconstruction formula: `arr[i] = arr[i-1] + diff[i]`.
- **Cyber-Engineering UI**: A custom-designed industrial terminal aesthetic with blueprint grid and scanner animations.
- **Hand-Crafted Iconography**: 100% custom SVG icon suite built specifically for this visualizer.
- **Sub-array Highlighting**: Visual focus on active indices during the prefix-sum animation.

---

### ️ Tech Stack

- **Core**: Next.js 16 (App Router) + React 19
- **Style**: Tailwind CSS v4 (Cyber-Engineering Theme)
- **Logic**: TypeScript (Type-safe Algorithm Rebuilds)
- **Icons**: Custom-engine SVG Architecture

---

### 🚀 Quick Start

```bash
# Install & Run
npm install && npm run dev
```

Visit [localhost:3000](http://localhost:3000) to see the terminal in action.

---

**Developed by [MUKUT KUMAR](https://github.com/MK-codes365) for OpenCode '24**
