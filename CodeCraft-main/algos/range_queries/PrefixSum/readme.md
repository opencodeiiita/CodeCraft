# Prefix Sum Mastery Guide
Efficient technique to answer range sum queries in `O(1)` time after preprocessing.

---

## Motivation: The Brute Force Bottleneck

### The Problem
Given an array of integers, answer multiple queries of the form:
> What is the sum of elements from index **L** to **R** (inclusive)?

### Why Brute Force Fails
- **Process:** Summing elements for each query requires a loop from `L` to `R`.
- **Complexity:** `O(N)` per query.
- **Scale:** For `Q` queries, the total time is `O(N × Q)`. If `N` and `Q` are both `10^5`, you face `10^10` operations—too slow for standard execution time limits (usually `10^8` ops/sec).

---

##  Key Idea & Intuition

### The Core Concept
Instead of recomputing sums repeatedly, **store cumulative sums once**.

If you know:
1. The total sum from index `0 → R`
2. The total sum from index `0 → L-1`

Then the middle section (`L` to `R`) is simply the difference:
> **Range Sum (L, R) = Prefix[R] − Prefix[L − 1]**



### Mental Model
Think of prefix sum as a **"running total"** or **"accumulation"** up to a specific point.
- ❌ No loops per query  
- ✅ Precompute once (`O(N)`) 
- ✅ Reuse previous work (`O(1)`)

---

## Algorithm Step-by-Step

### The Build Process
1. Create a `prefix` array of the same size as the input.
2. Set `prefix[0] = array[0]`.
3. For each index `i` from `1` to `n-1`:
   - `prefix[i] = prefix[i-1] + array[i]`
4. **To Query (L, R):**
   - If `L == 0`: Return `prefix[R]`
   - Else: Return `prefix[R] - prefix[L-1]`

---

## Implementation

### C++ Code
```cpp
#include <vector>
using namespace std;

// O(N) Preprocessing
vector<long long> buildPrefixSum(const vector<int>& arr) {
    int n = arr.size();
    if (n == 0) return {};
    
    vector<long long> prefix(n);
    prefix[0] = arr[0];

    for (int i = 1; i < n; i++) {
        prefix[i] = prefix[i - 1] + arr[i];
    }
    return prefix;
}

// O(1) Query
long long rangeSum(const vector<long long>& prefix, int L, int R) {
    if (L == 0) return prefix[R];
    return prefix[R] - prefix[L - 1];
}
```
---

## Example Walkthrough & Visualizer

### Dataset Step-by-Step
**Input Array:** `[2, -1, 3, 5, -2, 4]`



| Index | Value (A) | Calculation | **Prefix Sum (P)** |
| :--- | :--- | :--- | :--- |
| 0 | 2 | 2 | **2** |
| 1 | -1 | 2 + (-1) | **1** |
| 2 | 3 | 1 + 3 | **4** |
| 3 | 5 | 4 + 5 | **9** |
| 4 | -2 | 9 + (-2) | **7** |
| 5 | 4 | 7 + 4 | **11** |

### Query Example
**Problem:** Find the sum of elements from index **2** to **5**.
- **Variables:** `L = 2, R = 5`
- **Formula:** `P[R] - P[L-1]`
- **Substitution:** `P[5] - P[1]` $\rightarrow$ `11 - 1`
- **Result:** **10**

*Manual Verification:* `3 + 5 + (-2) + 4 = 10`. ✅

### 🎥 Interactive Trace
To see this accumulation and subtraction logic in action with custom data, use the interactive tool:
👉 **[Prefix Sum Visualizer](https://pholio.pearl99z.tech/extensions/prefixsum)**

---

## Complexity Analysis

| Phase | Time Complexity | Space Complexity |
| :--- | :--- | :--- |
| **Preprocessing (Building)** | `O(N)` | `O(N)` |
| **Range Query** | `O(1)` | `O(1)` |

> **Trade-off:** We use `O(N)` extra space to achieve the fastest possible query time.

---

## Practical Considerations & Edge Cases

### The Zero-Index Trap (`L = 0`)
When `L = 0`, the formula `P[R] - P[L-1]` attempts to access `P[-1]`, which will cause a segmentation fault or crash. 
**Solution:** 
```cpp
if (L == 0) return prefix[R];
else return prefix[R] - prefix[L-1];
```
## ⚠️ Integer Overflow

For large arrays (e.g., `N = 10^5`) with large values (e.g., `A[i] = 10^9`), the cumulative sum can exceed the 32-bit integer limit (`2,147,483,647`).

**Solution:**
- Use `long long` in **C++**
- Use `long` in **Java**

---

## When to Use vs. When Not to Use

### Use When:
- The array is **static** (no updates).
- You have **many range queries**.
- You are solving **subarray-related problems**.

### Do NOT Use When:
- The array is **frequently updated**.

---

## Practice Problems

| # | Problem | Difficulty |
|---|--------|------------|
| 1 | [Problem 1](https://leetcode.com/problems/range-sum-query-immutable/description/) | Easy |
| 2 | [Problem 2](https://leetcode.com/problems/running-sum-of-1d-array/description/) | Easy |
| 3 | [Problem 3](https://codeforces.com/problemset/problem/1605/B) | Medium |
| 4 | [Problem 4](https://codeforces.com/problemset/problem/1843/E) | Medium |
| 5 | [Problem 5](#) | Hard |
| 6 | [Problem 6](#) | Hard |


## Alternative Data Structures

- **Fenwick Tree (Binary Indexed Tree)**
- **Segment Tree**

Both support **updates and queries in `O(log N)` time**.


