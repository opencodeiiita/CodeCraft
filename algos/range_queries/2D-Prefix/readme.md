# 2D Prefix Sum Mastery Guide
Efficient technique to answer submatrix sum queries in `O(1)` time after `O(N × M)` preprocessing.

---

## Motivation: The Brute-Force Bottleneck (2D)

### The Problem
Given a 2D grid (matrix) of integers, answer multiple queries of the form:

> What is the sum of elements inside the submatrix with top-left `(r1, c1)` and bottom-right `(r2, c2)` (inclusive)?

### Why Brute Force Fails
- **Process:** Nested loops over rows `r1 → r2` and columns `c1 → c2`
- **Complexity:** `O((r2 − r1 + 1) × (c2 − c1 + 1))` per query
- **Scale:** With many queries on large matrices, this approach times out quickly

---

## Key Idea & Intuition

### Core Concept
Store **cumulative sums in two dimensions**.

Let  
`P[i][j]` = sum of all elements in rectangle `(0,0)` → `(i,j)`

Using **inclusion–exclusion**, the sum of any submatrix is:

```
SubmatrixSum =
P[r2][c2]
− P[r1−1][c2]
− P[r2][c1−1]
+ P[r1−1][c1−1]
```

### Mental Model
- `P[i][j]` = total of everything **above and left**
- We subtract extra regions and add back the overlap
- No loops during queries

---

## Build Process (Step-by-Step)

### Recommended: 1-Based Prefix Matrix
Using a `(n+1) × (m+1)` prefix matrix avoids boundary checks.

### Construction Formula
For matrix `A` (0-based):

```
P[i][j] = A[i-1][j-1]
        + P[i-1][j]
        + P[i][j-1]
        - P[i-1][j-1]
```

### Query Formula
For submatrix `(r1, c1)` → `(r2, c2)` (0-based):

```
answer =
P[r2+1][c2+1]
− P[r1][c2+1]
− P[r2+1][c1]
+ P[r1][c1]
```

---

## Implementation

### C++ (Safe 1-Based Prefix)
```cpp
#include <vector>
using namespace std;

vector<vector<long long>> buildPrefix2D(const vector<vector<int>>& A) {
    int n = A.size(), m = A[0].size();
    vector<vector<long long>> P(n + 1, vector<long long>(m + 1, 0));

    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            P[i][j] = A[i-1][j-1]
                    + P[i-1][j]
                    + P[i][j-1]
                    - P[i-1][j-1];
        }
    }
    return P;
}

long long rangeSum2D(
    const vector<vector<long long>>& P,
    int r1, int c1, int r2, int c2
) {
    return P[r2+1][c2+1]
         - P[r1][c2+1]
         - P[r2+1][c1]
         + P[r1][c1];
}
```

### Python
```python
def build_prefix_2d(A):
    n, m = len(A), len(A[0])
    P = [[0]*(m+1) for _ in range(n+1)]
    for i in range(1, n+1):
        for j in range(1, m+1):
            P[i][j] = A[i-1][j-1] + P[i-1][j] + P[i][j-1] - P[i-1][j-1]
    return P

def query(P, r1, c1, r2, c2):
    return (
        P[r2+1][c2+1]
        - P[r1][c2+1]
        - P[r2+1][c1]
        + P[r1][c1]
    )
```

---

## Example Walkthrough

### Input Matrix
```
1 2 3
4 5 6
7 8 9
```

### Prefix Matrix
```
0  0  0  0
0  1  3  6
0  5 12 21
0 12 27 45
```

### Query Example
Submatrix `(1,1)` → `(2,2)`:

```
P[3][3] - P[1][3] - P[3][1] + P[1][1]
= 45 - 6 - 12 + 1
= 28
```

---
## Visualizer
*(Left blank intentionally)*
___
## Complexity Analysis

| Phase | Time | Space |
|---|---|---|
| Preprocessing | `O(N × M)` | `O(N × M)` |
| Each Query | `O(1)` | `O(1)` |

---

## Practical Considerations

- Use **1-based prefix** to avoid index bugs
- Use `long long` to prevent overflow
- Works with **negative numbers**
- Avoid for huge grids due to memory limits

---

## When to Use vs When Not to Use

### Use When
- Matrix is static
- Many submatrix queries

### Do NOT Use When
- Frequent updates are needed

---

## Practice Problems

| # | Problem | Difficulty |
|---|---------|------------|
| 1 | [Range Sum Query 2D – Immutable](https://leetcode.com/problems/range-sum-query-2d-immutable/description/) | Easy |
| 2 | [Codeforces 2113C](https://codeforces.com/contest/2113/problem/C) | Medium |
| 3 | [Number of Submatrices That Sum to Target](https://leetcode.com/problems/number-of-submatrices-that-sum-to-target/description/) | Hard |
---

