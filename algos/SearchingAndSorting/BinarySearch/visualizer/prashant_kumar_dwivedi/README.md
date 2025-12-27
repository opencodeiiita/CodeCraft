# Binary Search Visualizer

This is a simple Binary Search visualizer built with Next.js and TypeScript.

It allows you to generate a sorted array or enter your own sorted array, enter a target value, and see the step-by-step process of binary search.

## Features

- Generate random sorted array or enter custom sorted array
- Enter target value to search for
- Step through the search manually with Previous/Next buttons
- Auto-play mode with adjustable speed
- Visual highlights:
  - Low, Mid, High pointers
  - Eliminated ranges (faded)
  - Found element (green highlight)
- Explanations for each step
- Result display with total steps

## How to Run

1. Navigate to the folder: `algos/SearchingAndSorting/BinarySearch/visualizer/prashant_kumar_dwivedi/`
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start the development server
4. Open the browser to the displayed URL

## Learning Notes

This is my first Next.js project, kept simple for learning purposes.

- `page.tsx` is the entry point in Next.js App Router, similar to a top-level React component.
- `BinarySearch.tsx` is a client component because it uses React hooks, requiring "use client".
- In Next.js, server components don't support client-side interactivity, so components with hooks need "use client".
- This differs from a plain React app where all components are inherently client-side.
