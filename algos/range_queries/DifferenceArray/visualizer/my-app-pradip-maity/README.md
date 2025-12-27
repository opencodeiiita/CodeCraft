# 🎯 Difference Array Visualizer

An interactive, modern web application for visualizing and understanding the Difference Array algorithm. Built with Next.js, TypeScript, and Tailwind CSS.

![Difference Array Visualizer](https://img.shields.io/badge/Next.js-14.0+-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0+-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

- **Interactive Visualization**: Step-by-step visualization of difference array operations
- **Real-time Updates**: Watch how range updates affect the difference and final arrays
- **Modern UI**: Beautiful glassmorphism design with smooth animations
- **Dark Mode**: Automatic dark/light theme support
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Educational**: Perfect for learning and understanding difference arrays

## 🚀 Live Demo

Experience the visualizer at [your-deployment-url](https://your-deployment-url.com)

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Icons**: Modern CSS-based icons
- **Fonts**: Geist font family for optimal readability

## 📋 Prerequisites

- Node.js 18.0 or later
- npm, yarn, pnpm, or bun

## 🏃‍♂️ Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/difference-array-visualizer.git
   cd difference-array-visualizer
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

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🎮 How to Use

1. **Set Array Size**: Adjust the array size (3-15 elements) using the input field
2. **Add Range Updates**: Use the form to add range updates with start index (L), end index (R), and value (X)
3. **Navigate Steps**: Use the step navigation controls to see how each update affects the arrays:
   - **Initial Array**: Shows the starting state (all zeros)
   - **Difference Array**: Displays the difference array after each update
   - **Final Array**: Shows the computed result after all updates
4. **Clear Updates**: Use the "Clear All Updates" button to reset and start over

## 🧮 Algorithm Explanation

The Difference Array is an efficient data structure for handling range updates and point queries. It uses the concept of storing differences between consecutive elements to allow O(1) range updates and O(n) prefix sum computation.

### How it works:
1. **Initialization**: Create an array of size n, initialized to zeros
2. **Range Update [L, R] += X**:
   - Add X to difference[L]
   - Subtract X from difference[R+1] (if R+1 < n)
3. **Compute Final Array**: Perform prefix sum on the difference array

## 🎨 Design Features

- **Glassmorphism Effects**: Modern frosted glass appearance
- **Smooth Animations**: CSS transitions with cubic-bezier easing
- **Gradient Backgrounds**: Dynamic color schemes for different array types
- **Interactive Highlights**: Animated highlighting of affected ranges
- **Responsive Layout**: Adapts beautifully to all screen sizes

## 📁 Project Structure

```
difference-array-visualizer/
├── app/
│   ├── components/
│   │   ├── ArrayDisplay.tsx      # Array visualization component
│   │   ├── UpdateControls.tsx    # Update input form
│   │   └── lib/
│   │       └── utils.ts          # Utility functions
│   ├── globals.css               # Global styles and animations
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main application page
├── public/                       # Static assets
├── package.json                  # Dependencies and scripts
└── README.md                     # This file
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Inspired by algorithm visualization tools

## 📞 Contact

For questions or suggestions, please open an issue on GitHub.

---

**Made with ❤️ for algorithm enthusiasts**
