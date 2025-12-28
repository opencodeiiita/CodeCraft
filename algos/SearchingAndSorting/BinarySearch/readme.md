# Binary Search Mastery Guide
Efficient technique to locate elements or boundaries in **sorted search spaces** in `O(log N)` time.

---

## Motivation: Linear Search Bottleneck

### The Problem
Given a **sorted array**, answer queries like:
- Is element `x` present?
- What is the first / last occurrence of `x`?
- What is the smallest value satisfying a condition?

### Why Linear Search Fails
- **Process:** Scan elements one by one
- **Time:** `O(N)` per query
- **Issue:** Too slow for large `N`

---

## Key Idea & Intuition

Binary Search works because **sorting gives order**.

At every step:
1. Look at the middle element
2. Decide which half cannot contain the answer
3. Discard that half forever

Each step removes **half** the search space.

---

## Preconditions (Very Important ⚠️)

Binary search works **only if**:
- Array is sorted  
  **OR**
- The search condition is monotonic (false → false → true → true)

Otherwise, it gives **wrong answers silently**.

---

## Algorithm (Classic Binary Search)

### Steps
1. `L = 0`, `R = n - 1`
2. While `L <= R`
3. `mid = L + (R - L) / 2`
4. Compare `A[mid]` with `x`
5. Move left or right accordingly

---

## Implementation

### C++ — Standard Binary Search

    #include <vector>
    using namespace std;

    int binarySearch(const vector<int>& a, int x) {
        int l = 0, r = (int)a.size() - 1;
        while (l <= r) {
            int mid = l + (r - l) / 2;
            if (a[mid] == x) return mid;
            else if (a[mid] < x) l = mid + 1;
            else r = mid - 1;
        }
        return -1;
    }

---

## Example Walkthrough

**Array:** `[1, 3, 5, 7, 9, 11]`  
**Target:** `7`

| Step | L | R | mid | A[mid] | Action |
|----|----|----|----|----|----|
| 1 | 0 | 5 | 2 | 5 | Go right |
| 2 | 3 | 5 | 4 | 9 | Go left |
| 3 | 3 | 3 | 3 | 7 | Found |

---

## 🎥 Visualizer

Use the interactive binary search visualizer to see how `L`, `R`, and `mid` move step by step:

👉 **Binary Search Visualizer** *(link coming soon)*

---

## Binary Search on Answer

Binary search is **not limited to arrays**.

You can binary search:
- Time
- Distance
- Minimum feasible value
- Maximum valid value

As long as a predicate is monotonic.

---

### Binary Search on Answer Template

    bool check(long long mid) {
        return true; // monotonic condition
    }

    long long solve(long long L, long long R) {
        long long ans = -1;
        while (L <= R) {
            long long mid = L + (R - L) / 2;
            if (check(mid)) {
                ans = mid;
                R = mid - 1;
            } else {
                L = mid + 1;
            }
        }
        return ans;
    }

---

## Common Variants

### First Occurrence

    int firstOccurrence(const vector<int>& a, int x) {
        int l = 0, r = (int)a.size() - 1, ans = -1;
        while (l <= r) {
            int mid = l + (r - l) / 2;
            if (a[mid] >= x) {
                if (a[mid] == x) ans = mid;
                r = mid - 1;
            } else l = mid + 1;
        }
        return ans;
    }

---

### Last Occurrence

    int lastOccurrence(const vector<int>& a, int x) {
        int l = 0, r = (int)a.size() - 1, ans = -1;
        while (l <= r) {
            int mid = l + (r - l) / 2;
            if (a[mid] <= x) {
                if (a[mid] == x) ans = mid;
                l = mid + 1;
            } else r = mid - 1;
        }
        return ans;
    }

---

## Complexity Analysis

| Operation | Time | Space |
|---------|------|-------|
| Binary Search | `O(log N)` | `O(1)` |

---

## Edge Cases & Pitfalls

### Overflow-safe mid
Always use:

    mid = l + (r - l) / 2;

### Infinite loops
Ensure `l` or `r` changes every iteration.

---

## When to Use vs When Not

### Use When:
- Data is sorted
- Predicate is monotonic
- Search space is large

### Do NOT Use When:
- Data is unsorted
- Predicate is non-monotonic

---

## Practice Problems 

| # | Problem | Difficulty |
|---|--------|------------|
| 1 | [Problem 1](#) | Easy |
| 2 | [Problem 2](#) | Easy |
| 3 | [Problem 3](#) | Medium |
| 4 | [Problem 4](#) | Medium |
| 5 | [Problem 5](#) | Hard |
| 6 | [Problem 6](#) | Hard |

---

## Final Takeaway

Binary Search is not just an algorithm —  
it is a **thinking pattern**.

> If you can ask  
> “Is the answer ≤ X?”  
>  
> You can binary search it.
