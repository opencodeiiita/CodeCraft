# Contributing Guidelines

First off, thank you for considering contributing to this repository! 

We welcome contributions from everyone—whether you are a seasoned competitive programmer or just starting out. The goal of this repository is to build a clean, well-documented library of algorithms and data structures.

Following these guidelines helps maintain the quality of the codebase and ensures your Pull Request (PR) can be reviewed and merged quickly.

---

## 🚀 Quick Start Checklist

1.  **Fork** the repository to your GitHub account.
2.  **Clone** the fork to your local machine.
3.  **Create a Branch** for your solution (`git checkout -b feat/new-algo-solution`).
4.  **Implement** your solution following the [Coding Standards](#-coding-standards) below.
5.  **Commit** your changes with a meaningful message.
6.  **Push** to your fork and submit a **Pull Request**.

---

## 📂 Directory Structure & Naming

To keep the repository organized, we follow a strict directory hierarchy. Please ensure your files are placed correctly.

### Path Format
`algo/<Category>/<SubCategory>/soln/<YourUsername>/<FileName>.cpp`

### Example
If you are adding a solution for a **Difference Array** problem:
```text
algo/
└── rangeQueries/            <-- Category
    └── differenceArray/     <-- SubCategory
        └── soln/
            └── johndoe/     <-- Your GitHub Username
                ├── Solution1.cpp
                └── CorporateFlightBookings.cpp

Every source file must start with the following comment block. Do not skip the Complexity analysis.
/**
 * Problem: [Problem Name]
 * Link: [https://forum.wordreference.com/threads/let-us-know-if-there-is-any-problem-are-any-problems.3563132/](https://forum.wordreference.com/threads/let-us-know-if-there-is-any-problem-are-any-problems.3563132/)
 *
 * Short Problem Statement:
 * [Brief description of what needs to be solved]
 *
 * Approach:
 * [Explain the algorithm/logic used. Mention specific techniques like Prefix Sums, Two Pointers, etc.]
 *
 * Time Complexity: O(...)
 * Space Complexity: O(...)
 *
 * Example I/O:
 * Input: 
 * ...
 * Output: 
 * ...
 */