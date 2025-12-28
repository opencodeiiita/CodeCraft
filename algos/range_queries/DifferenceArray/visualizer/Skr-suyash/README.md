# 🎯 Difference Array Technique Visualizer

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)

**An interactive, beautiful visualizer for understanding the Difference Array technique for efficient range updates**

[Features](#-features) • [Getting Started](#-getting-started) • [Usage](#-usage) • [How It Works](#-how-it-works)

</div>

---

## 📖 Overview

The **Difference Array Technique Visualizer** is an educational tool that helps you understand and visualize how the difference array algorithm efficiently handles multiple range updates in O(1) time complexity. This interactive web application provides a step-by-step visualization of how range updates are applied and how the final array is computed using prefix sums.

### 🎓 What is the Difference Array Technique?

The difference array technique is an optimization method used to efficiently apply multiple range updates to an array. Instead of updating each element in a range individually (which would be O(n) per update), this technique allows you to:

- Apply range updates in **O(1)** time
- Compute the final array in **O(n)** time
- Handle multiple updates before querying the final result

---

## ✨ Features

### 🎨 **Interactive Visualization**
- **Real-time Updates**: See how the difference array changes as you apply range updates
- **Step-by-Step Navigation**: Navigate through updates one by one with Previous/Next buttons
- **Visual Highlighting**: Color-coded elements show which indices are affected by each update
- **Animated Transitions**: Smooth animations using Framer Motion for a polished experience

### 📊 **Multiple Array Views**
- **Initial Array**: Set custom starting values for your array
- **Difference Array (diff[])**: Visualize how updates are stored in the difference array
- **Final Array**: See the result after computing the prefix sum

### 🎛️ **Flexible Controls**
- **Adjustable Array Size**: Set array size from 2 to 20 elements
- **Custom Initial Values**: 
  - Set individual array elements
  - Import values using space-separated format
  - Reset to zeros with one click
- **Range Update Inputs**: Easy-to-use controls for L (left index), R (right index), and X (value to add)

### 📝 **Update Management**
- **Update History**: Visual buttons showing all applied updates
- **Click to Navigate**: Jump to any step by clicking on update buttons
- **Step Counter**: Track your progress through the updates
- **Clear All**: Reset all updates and start fresh

### 🎓 **Educational Content**
- **Beautiful Formula Display**: Syntax-highlighted code showing the algorithm
- **Step-by-Step Explanations**: Understand what happens at each step
- **Complexity Analysis**: Learn about time and space complexity
- **Visual Feedback**: See exactly which elements are affected by each update

### 🎨 **Beautiful UI/UX**
- **Modern Dark Theme**: Sleek dark interface with gradient accents
- **Responsive Design**: Works beautifully on all screen sizes
- **Gradient Buttons**: Beautiful gradient-styled buttons with hover effects
- **Smooth Animations**: Polished transitions and scale effects
- **Color-Coded Elements**: 
  - 🔵 Blue for difference array
  - 🟣 Purple for initial array
  - 🟢 Green for final array
  - 🟡 Yellow for highlighted/affected elements

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd visualizer
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

---

## 📖 Usage

### Basic Workflow

1. **Set Array Size**: Adjust the array size (n) using the input field (2-20)

2. **Set Initial Values** (Optional):
   - Click "Set Array" to show input fields
   - Enter values for each index individually, or
   - Click "Import from Space-Separated Values" and paste values like: `1 2 3 4 5 6`

3. **Add Range Updates**:
   - Enter **L** (left index): starting index of the range
   - Enter **R** (right index): ending index of the range
   - Enter **X** (value): the value to add to the range [L, R]
   - Click "Add Update"

4. **Navigate Through Updates**:
   - Use **Previous** and **Next** buttons to step through updates
   - Click on any update button in the history to jump to that step
   - Watch how the difference array and final array change

5. **Observe the Visualization**:
   - **Initial Array**: Your starting values
   - **Difference Array**: Shows how updates are stored (diff[L] += X, diff[R+1] -= X)
   - **Final Array**: The result after computing prefix sum

### Example

Let's say you want to:
- Start with array: `[0, 0, 0, 0, 0, 0]`
- Add 5 to range [1, 3]
- Add 3 to range [2, 4]

**Steps:**
1. Set array size to 6
2. Add update: L=1, R=3, X=5
3. Add update: L=2, R=4, X=3
4. Navigate through steps to see how each update affects the arrays

**Result**: Final array will be `[0, 5, 8, 8, 3, 0]`

---

## 🔬 How It Works

### The Algorithm

The difference array technique works in two phases:

#### Phase 1: Apply Updates (O(1) per update)

For each range update [L, R] with value X:

```javascript
diff[L]   += X
diff[R+1] -= X  // if R+1 <= n
```

This stores the update information without modifying the entire range.

#### Phase 2: Compute Final Array (O(n))

Compute the prefix sum of the difference array and add to initial values:

```javascript
prefix[0] = diff[0]
prefix[i] = prefix[i-1] + diff[i]  // for i > 0
final[i] = initial[i] + prefix[i]
```

### Time Complexity

- **Range Update**: O(1) per update
- **Compute Final Array**: O(n)
- **Total for m updates**: O(m + n)

### Space Complexity

- **O(n)**: One additional array of size n+1 for the difference array

### Why It's Efficient

Instead of updating each element in a range [L, R] individually (which would be O(n) per update), the difference array technique:
- Marks the start of the range with `+X`
- Marks the end of the range with `-X`
- Computes the cumulative effect using prefix sum

This is especially powerful when you need to apply many range updates before querying the final array.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 16.1.1](https://nextjs.org/) - React framework for production
- **UI Library**: [React 19.2.3](https://react.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS framework
- **Animations**: [Framer Motion 12.23.26](https://www.framer.com/motion/) - Production-ready motion library

---

## 📁 Project Structure

```
visualizer/
├── app/
│   ├── page.tsx              # Main page component
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   └── DifferenceArrayVisualizer.tsx  # Main visualizer component
├── public/                   # Static assets
├── package.json              # Dependencies
└── README.md                 # This file
```

---

## 🎯 Use Cases

This visualizer is perfect for:

- **Students** learning algorithms and data structures
- **Educators** teaching the difference array technique
- **Developers** understanding optimization techniques
- **Interview Preparation** for coding interviews
- **Algorithm Visualization** enthusiasts

---

<div align="center">

**Made with ❤️ for learning and education**

</div>
