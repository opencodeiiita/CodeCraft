# ⚡ Difference Array Visualizer

> A high-performance, cyberpunk-themed visualizer for range update algorithms.

---

### 📟 Difference Array Visualizer: Cyber-Engineering Edition

![Project Banner](https://img.shields.io/badge/Status-Elite_Build_v1.0-cyan?style=for-the-badge&logoScale=1.2)
![Theme](https://img.shields.io/badge/Theme-Cyberpunk_Terminal-pink?style=for-the-badge)
![Tech](https://img.shields.io/badge/Stack-Next.js_15_|_Tailwind_4-white?style=for-the-badge)

A premium, interactive algorithmic workstation designed to visualize the **Difference Array (Range Update)** protocol. This isn't just a visualizer; it's a high-performance terminal for understanding how Constant Time $O(1)$ updates reconstruct into Linear Time $O(N)$ queryable states.

---

## 🏗️ The Problem: Naive Range Updates

Updating a range $[L, R]$ with value $X$ in a normal array takes **$O(N)$** time because you must iterate through every element. For $Q$ updates, the complexity becomes **$O(Q \times N)$**, which is catastrophic for large datasets.

## ⚡ The Solution: Difference Array Optimization

By utilizing a **Difference Buffer**, we reduce the update complexity to **$O(1)$**.

1.  **Rise Entry**: `diff[L] += X`
2.  **Fall Exit**: `diff[R+1] -= X`
3.  **Reconstruction**: A single Prefix Sum pass $O(N)$ rebuilds the final state.

---

## � Elite Features

### 🖱️ 1. Interactive Drag-Selection (Elite)

Forget typing index numbers. Click and drag your mouse across the **Reconstructed State** array to dynamically define your $L$ and $R$ values. The control panel synchronizes in real-time.

### ⚖️ 2. Naive vs. Optimized Simulation (Comparative)

Toggle between **Optimized Protocol** and **Naive Protocol**.

- **Optimized**: Watch markers drop in $O(1)$.
- **Naive**: Watch the system struggle as it touches every single index in linear time $(O(N))$.

### 🔄 3. VCR-Style Manual Playback

Complete control over the reconstruction timeline. Step through index-by-index using `Prev` and `Next`, or hit `Play` for the full automated build.

### 📟 4. Dynamic Mathematical Logs

Every step of the reconstruction is recorded in the **Step-by-step Explanation** terminal, showing the exact formula:
`arr[i] = arr[i-1] + diff[i]`

---

## ✨ Design Aesthetics

- **Cyber-Engineering Interface**: Built on a blueprint grid system with industrial scanner animations.
- **100% Custom SVGs**: No generic library icons. Every icon (Terminal, Logo, Settings, Controls) is hand-crafted code.
- **Operator HUB**: Personalized pulsating branding for **MUKUT KUMAR**.
- **Haptic Visuals**: Glassmorphism, neon glows, and micro-animations for every interaction.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4 (Custom Tokens)
- **Logic**: React 19 Hooks (useMemo, useEffect, useState)
- **Animations**: CSS Scanners + Tailwind Transitions
- **Icons**: React SVG Component Suite

---

## 🏃 Quick Start

1.  **Clone & Navigate**:
    ```bash
    cd algos/range_queries/DifferenceArray/visualizer/mukut
    ```
2.  **Install Protocols**:
    ```bash
    npm install
    ```
3.  **Initialize System**:
    ```bash
    npm run dev
    ```
4.  **Access Terminal**: Open `http://localhost:3000`

---

## 📂 Project Structure

```text
mukut/
├── app/
│   ├── components/
│   │   ├── BlueprintArray.tsx  # Interactive Grid System
│   │   ├── ControlPanel.tsx    # System Command Center
│   │   └── Icons.tsx           # Custom Hand-crafted SVGs
│   ├── hooks/
│   │   └── useDifferenceArray.ts # Core Algorithmic Logic
│   ├── globals.css            # Cyber-Industrial Theme
│   └── page.tsx               # Main Workstation UI
└── public/
    └── favicon.ico            # Custom Operator Identity
```

---

## 🎖️ Credits

**Designed & Engineered by:** [MUKUT KUMAR](https://github.com/MK-codes365)
_Part of OpenCode '24 - CodeCraft_

---

### 🚀 Quick Start

```bash
# Install & Run
npm install && npm run dev
```

Visit [localhost:3000](http://localhost:3000) to see the terminal in action.

---

**Developed by [MUKUT KUMAR](https://github.com/MK-codes365) for OpenCode '24**
