# Difference Array Visualizer 🎯

An interactive web application to visualize and understand **Difference Arrays** and **Range Updates** using prefix sums.

## 🌟 Features

- **Interactive Array Configuration**: Adjust array size (4-12 elements) with a slider
- **Custom Initial Array**: Edit individual array values before applying updates
- **Quick Demo Presets**: Three pre-configured examples to get started instantly
- **Range Updates**: Add multiple range updates with custom values
- **Step-by-Step Visualization**: Navigate through each step of the algorithm
- **Auto-Play Mode**: Watch the visualization automatically progress with adjustable speed
- **Animation Speed Control**: Choose between Slow, Medium, and Fast playback
- **Dark Mode** 🌙: Toggle between light and dark themes
- **Code Display**: View the actual algorithm implementation
- **Complexity Comparison**: See real-time comparison of naive vs difference array approach
- **Keyboard Shortcuts**: Navigate efficiently with arrow keys, space, and R
- **Color-Coded Arrays**: 
  - 🟢 Green: Positive values
  - 🔴 Red: Negative values
  - ⚪ Gray: Zero values
  - 🟡 Yellow: Highlighted (current operation)
  - 🟣 Purple: Currently computing prefix sum
- **Real-time Highlighting**: See exactly which indices are being modified
- **Educational Tooltips**: Learn how difference arrays work with detailed explanations

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Navigate to the visualizer directory
cd algos/range_queries/DifferenceArray/visualizer/hsd2514

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## 📖 How to Use

1. **Try Quick Demos**: Click one of the preset demo buttons to see examples instantly
2. **Set Array Size**: Use the slider to choose your array size (4-12 elements)
3. **Edit Initial Values** (Optional): Click "Edit" to customize initial array values
4. **Add Range Updates**: 
   - Enter L (start index)
   - Enter R (end index)
   - Enter X (value to add)
   - Click "Add Update"
5. **Visualize**: Click the "Visualize" button to generate all steps
6. **Navigate**: 
   - Use "Previous" and "Next" buttons to move through steps
   - Click "Play" for automatic progression
   - Adjust animation speed (Slow/Medium/Fast)
7. **Explore Features**:
   - Toggle 🌙 dark mode for comfortable viewing
   - Click </> to view algorithm code
   - Click 📊 to see complexity comparison
8. **Keyboard Shortcuts**:
   - ← → Arrow keys to navigate steps
   - Space to play/pause
   - R to reset
9. **Reset**: Start over with the "Reset" button

## 🧠 Algorithm Explanation

### What is a Difference Array?

A difference array is a powerful technique to handle multiple range updates efficiently.

**Problem**: Given an array and multiple queries to add a value X to all elements in range [L, R]

**Naive Approach**: O(q × n) - iterate through range for each query

**Difference Array Approach**: O(q + n)

### How It Works

1. **Initialize**: Create difference array `diff[]` (initially same as original array or all zeros)

2. **Apply Range Updates**: For each update `[L, R] += X`:
   ```
   diff[L] += X      // Mark start of range
   diff[R+1] -= X    // Mark end of range (if R+1 exists)
   ```

3. **Compute Final Array**: Apply prefix sum:
   ```
   result[0] = diff[0]
   for i from 1 to n-1:
       result[i] = result[i-1] + diff[i]
   ```

### Example

**Array**: `[0, 0, 0, 0, 0]`

**Updates**:
- `[1, 3] += 10` 
- `[2, 4] += 5`

**Difference Array After Updates**: `[0, 10, 5, 0, -5, -10]`

**Final Array (after prefix sum)**: `[0, 10, 15, 15, 10, 0]`

## 💻 Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Runtime**: React 18

## 📁 Project Structure

```
hsd2514/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── components/
│       └── DifferenceArrayVisualizer.tsx
├── public/
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── next.config.js
└── README.md
```

## 🎨 Design Inspiration

UI/UX inspired by the [Prefix Sum Visualizer](https://pholio.pearl99z.tech/extensions/prefixsum)

## 🔧 Customization

### Modify Array Size Limits

In `DifferenceArrayVisualizer.tsx`:
```typescript
<input
  type="range"
  min="4"    // Change minimum
  max="12"   // Change maximum
  ...
/>
```

### Adjust Animation Speed Presets

Change the speed options:
```typescript
const [playSpeed, setPlaySpeed] = useState(1500) // Default speed

// Speed options: 500 (Fast), 1500 (Medium), 2500 (Slow)
```

### Customize Color Themes

Modify the `getArrayColor` function to change color schemes for both light and dark modes.

## 🤝 Contributing

This visualizer is part of the CodeCraft project. Contributions are welcome!

### To Contribute:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 Algorithm Complexity

| Operation | Time Complexity | Space Complexity |
|-----------|----------------|------------------|
| Single Range Update | O(1) | O(n) |
| q Range Updates | O(q) | O(n) |
| Prefix Sum | O(n) | O(n) |
| **Total** | **O(q + n)** | **O(n)** |

## 🐛 Known Issues

None at the moment! If you find any bugs, please report them.

## 📄 License

This project is part of CodeCraft and follows the repository's license.

## 👨‍💻 Author

**hsd2514**
- Part of the CodeCraft Range Queries Collection
- Built for OpenCode IIITA Hackathon

## 🙏 Acknowledgments

- Thanks to the CodeCraft team for the opportunity
- Inspired by existing Prefix Sum visualizer at [pholio.pearl99z.tech](https://pholio.pearl99z.tech/)

## 📚 Learn More

- [Difference Array - GeeksforGeeks](https://www.geeksforgeeks.org/difference-array-range-update-query-o1/)
- [Range Updates using Difference Array](https://cp-algorithms.com/data_structures/fenwick.html)

---

**Made with ❤️ for learning algorithms visually**
