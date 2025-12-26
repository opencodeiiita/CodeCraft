# Difference Array (Range Update Point Query)

A powerful technique to perform multiple range update operations on an array in `O(1)` time complexity.

---

## 🧐 The Concept

### The Problem

Given an array `A` of size `N` initialized to 0. You have `Q` operations.
Each operation gives you three integers `L`, `R`, and `X`.
**Task:** Add `X` to all elements from index `L` to `R` (inclusive).
After all operations, return the final array.

### 🚫 Brute Force Approach

Iterate from `L` to `R` for every query and add `X`.

- **Time Complexity per Query:** `O(N)`
- **Total Time Complexity:** `O(N * Q)`
- **Verdict:** Too slow for large inputs ($N, Q \le 10^5$).

### ✅ Optimized Approach: Difference Array

Instead of updating every element, we maintain a **Difference Array** `D`.
The key idea is to store the **rate of change** (slope) rather than the values themselves.

#### The Magic Formula

To add `X` to range `[L, R]`:

1.  `D[L] += X` (Start adding `X` from index `L`)
2.  `D[R + 1] -= X` (Stop adding `X` after index `R`)

After processing all queries, the value of the original array at index `i` is the **Prefix Sum** of `D` up to `i`.

---

## 📝 Implementation (C++)

```cpp
#include <vector>
#include <iostream>

using namespace std;

// Function to process Range Updates
// Time Complexity: O(Q) for updates + O(N) for reconstruction
vector<long long> differenceArray(int n, const vector<vector<int>>& queries) {
    // 1. Initialize Difference Array (Size N+1 to handle R+1 case)
    vector<long long> D(n + 1, 0);

    // 2. Process all Q queries in O(1) each
    for (const auto& q : queries) {
        int l = q[0];
        int r = q[1];
        int x = q[2];

        D[l] += x;
        if (r + 1 < n) {
            D[r + 1] -= x;
        }
    }

    // 3. Reconstruct the Array (Prefix Sum)
    vector<long long> result(n);
    result[0] = D[0];
    for (int i = 1; i < n; i++) {
        result[i] = result[i - 1] + D[i];
    }

    return result;
}

int main() {
    int N = 5;
    // Format: {L, R, X}
    vector<vector<int>> queries = {
        {0, 2, 100},  // Add 100 to index 0...2
        {1, 4, 50},   // Add 50 to index 1...4
        {3, 4, -10}   // Subtract 10 from index 3...4
    };

    vector<long long> finalArray = differenceArray(N, queries);

    cout << "Final Array: ";
    for (long long val : finalArray) {
        cout << val << " ";
    }
    cout << endl;
    return 0;
}
```

---

## 🎨 Interactive Visualizer

We have included a **local, interactive visualizer** to help you build intuition!
No internet connection required.

### [👉 Launch Visualizer (Open visualizer.html)](./visualizer.html)

1. Open `visualizer.html` in your browser.
2. Initialize an array size.
3. Apply Range Updates and watch the `Difference Array` and `Final Array` update in real-time.

---

## 📊 Complexity Analysis

| Phase                   | Time Complexity | Space Complexity |
| :---------------------- | :-------------- | :--------------- |
| **Updates (Q queries)** | `O(Q)`          | `O(N)`           |
| **Reconstruction**      | `O(N)`          | `O(N)`           |
| **Total**               | `O(N + Q)`      | `O(N)`           |

> **Trade-off:** We use `O(N)` extra space to achieve `O(1)` update time.
