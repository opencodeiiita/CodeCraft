# Binary Search Visualization

An interactive visualization tool for understanding the Binary Search algorithm with step-by-step execution and real-time visualization.

## Features

- **Interactive Array Visualization**: Watch the binary search algorithm work in real-time on a sorted array
- **Step-by-Step Execution**: Control the algorithm step-by-step to understand each phase of the search
- **Customizable Input**: Modify the input array and target value to experiment with different scenarios
- **Auto Play**: Run the algorithm automatically to see the complete search process
- **Algorithm Explanation**: Learn how binary search works with detailed explanations
- **Time Complexity**: Displays O(log n) search computation

## How to Use

### Getting Started

First, install dependencies and run the development server:

```bash
npm install
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the visualization.

### Using the Visualizer

1. **Control Panel** (Right side):
   - Enter a custom array or use the default sorted array [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
   - Set the target value you want to search for
   - Use step controls to move through the algorithm execution
   - Click "Auto Play" to watch the algorithm run automatically

2. **Array Visualizer** (Left side):
   - Visual representation of the array
   - Highlights showing the current search range
   - Current middle element being compared
   - Target element position when found

3. **Algorithm Explanation**:
   - Detailed explanation of how binary search works
   - Understanding of the divide-and-conquer approach

## Components

- **BS.tsx**: Main component managing state and layout
- **ArrayVisualizer**: Displays the array and algorithm progress
- **ControlPanel**: Handles user input and algorithm controls
- **AlgorithmExplanation**: Shows how binary search works

## Project Setup

This is a [Next.js](https://nextjs.org) project with TypeScript, Tailwind CSS, and ESLint configured.

### Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Technologies Used

- **Next.js 15**: React framework for building the UI
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **React Hooks**: For state management

## Learning Resources

- [Binary Search Algorithm Guide](https://en.wikipedia.org/wiki/Binary_search_algorithm)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

Created as part of the CodeCraft project to help visualize and understand fundamental computer science algorithms.
