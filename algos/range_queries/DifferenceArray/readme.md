# Difference Array Mastery Guide
Efficient technique to handle **range updates** in `O(1)` time using prefix sums.

---

## Motivation: The Range Update Bottleneck

### The Problem
Given an array of integers, perform multiple operations of the form:
> Add a value **X** to all elements from index **L** to **R** (inclusive).

After all updates, output the final array.

### Why Brute Force Fails
- **Process:** For every update, loop from `L` to `R` and add `X`.
- **Complexity:** `O(N)` per update.
- **Scale:** For `Q` updates, total time is `O(N × Q)`.  
  With `N, Q = 10^5`, this becomes infeasible.

---

## Key Idea & Intuition

### The Core Concept
Instead of updating every element in `[L, R]`, **mark only the boundaries**.

We use a **Difference Array `diff[]`** such that:
- `diff[L] += X`
- `diff[R + 1] -= X` (if `R + 1 < N`)

After processing all updates, take a **prefix sum of `diff[]`** to recover the final array.

---

### Mental Model
Think of it as:
- Turning an update **ON** at index `L`
- Turning it **OFF** after index `R`

The prefix sum spreads the effect automatically.

- ❌ No looping per update  
- ✅ Each update in `O(1)`  
- ✅ Final prefix pass in `O(N)`

---

## Algorithm Step-by-Step

### The Build Process
1. Create a `diff` array of size `n`, initialized with `0`.
2. For each update `(L, R, X)`:
   - `diff[L] += X`
   - If `R + 1 < n`, do `diff[R + 1] -= X`
3. Build the final array using prefix sum:
   - `final[0] = diff[0]`
   - `final[i] = final[i-1] + diff[i]`

---

## Implementation

### C++ Code
```cpp
#include <vector>
using namespace std;

// Apply range updates using Difference Array
vector<long long> applyUpdates(
    int n,
    const vector<tuple<int, int, int>>& updates
) {
    vector<long long> diff(n, 0);

    // Step 1: Apply difference updates
    for (auto [L, R, X] : updates) {
        diff[L] += X;
        if (R + 1 < n) diff[R + 1] -= X;
    }

    // Step 2: Build final array using prefix sum
    vector<long long> result(n);
    result[0] = diff[0];
    for (int i = 1; i < n; i++) {
        result[i] = result[i - 1] + diff[i];
    }

    return result;
}
```
## Example Walkthrough & Visualizer

### Dataset Step-by-Step
**Initial Array Size:** `n = 6`  

**Updates Applied:**
1. Add `+3` to range `[1, 4]`
2. Add `+2` to range `[2, 5]`

---

### Difference Array After Updates

| Index | diff value |
|------|------------|
| 0 | 0 |
| 1 | +3 |
| 2 | +2 |
| 3 | 0 |
| 4 | 0 |
| 5 | -3 |

---

### Building Final Array Using Prefix Sum

| Index | Prefix Calculation | Final Value |
|------|--------------------|-------------|
| 0 | 0 | **0** |
| 1 | 0 + 3 | **3** |
| 2 | 3 + 2 | **5** |
| 3 | 5 + 0 | **5** |
| 4 | 5 + 0 | **5** |
| 5 | 5 - 3 | **2** |

✅ **Final Array:** `[0, 3, 5, 5, 5, 2]`

---

### 🎥 Interactive Trace
👉 **[Difference Array Visualizer](https://pholio.pearl99z.tech/extensions/differencearray)**



---

## Complexity Analysis

| Phase | Time Complexity | Space Complexity |
|-----|----------------|----------------|
| **Each Update** | `O(1)` | `O(1)` |
| **Final Build (Prefix Sum)** | `O(N)` | `O(N)` |
| **Total** | `O(N + Q)` | `O(N)` |

---

## Practical Considerations & Edge Cases

### ⚠️ Right Boundary Check
Always ensure:
```cpp
if (R + 1 < n) diff[R + 1] -= X;
```

### ⚠️ Integer Overflow
Large values and many updates can overflow 32-bit integers.

**Solution:**
- Use `long long` in **C++**
- Use `long` in **Java**

---

## When to Use vs. When Not to Use

### Use When:
- You have **many range updates**
- Updates are applied **offline**
- Only the **final array** is required

### Do NOT Use When:
- You need **intermediate query results**
- You need **online updates + queries**

---

## Practice Problems

| # | Problem | Difficulty |
|---|--------|------------|
| 1 | [Problem 1]() | Easy |
| 2 | [Problem 2]() | Medium |
| 3 | [Problem 3]() | Medium |
| 4 | [Problem 4]() | Hard |

---

## Related Techniques

- **Prefix Sum**
- **Range Addition Queries**
- **Sweep Line Technique**
- **Fenwick Tree / Segment Tree**

---
