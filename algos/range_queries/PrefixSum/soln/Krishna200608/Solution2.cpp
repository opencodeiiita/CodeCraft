/*
====================================================
Problem: Tracking Segments (Codeforces 1843E)
====================================================

-------------------------
Short Problem Statement
-------------------------
You are given:
- An array of length n, initially filled with 0s
- m segments [l, r]
- q update operations, where each operation turns one position into 1

After each update, more 1s are added (never removed).

A segment is called "beautiful" if it contains strictly more 1s than 0s.

Your task is to find the smallest k (1 ≤ k ≤ q) such that
after applying the first k updates, at least one segment becomes beautiful.
If no such k exists, output -1.

-------------------------
Approach (Binary Search + Prefix Sums)
-------------------------
Key Observations:
- Updates are monotonic: once a position becomes 1, it stays 1
- The condition "some segment becomes beautiful" is monotonic
  (false → true, but never true → false)

Thus, we can binary search on k (number of applied updates).

For a fixed k:
1. Create an array arr[1..n], initially all 0
2. Apply the first k updates → set arr[queries[i]] = 1
3. Build prefix sum:
   prefix[i] = number of 1s in arr[1..i]
4. For each segment [l, r]:
   - ones = prefix[r] - prefix[l-1]
   - length = r - l + 1
   - zeros = length - ones
   - if ones > zeros → segment is beautiful

If any segment is beautiful, k is valid.

-------------------------
Time & Space Complexity
-------------------------
Let:
- n = array size
- m = number of segments
- q = number of updates

Time Complexity:
- Each check: O(n + m)
- Binary search over q → O((n + m) * log q)

Space Complexity:
- O(n) for the array and prefix sums

-------------------------
Example (Optional)
-------------------------
Input:
1
5 2
1 3
2 5
3
1 2 3

Output:
2

Explanation:
After first 2 updates, segment [1,3] has more 1s than 0s.

-------------------------
Clean, Compiling C++ Code
-------------------------
*/

#include <bits/stdc++.h>
using namespace std;

bool check(int k, int n,
           const vector<pair<int, int>>& segments,
           const vector<int>& queries) {

    vector<int> arr(n + 1, 0);

    // Apply first k updates
    for (int i = 0; i < k; i++) {
        arr[queries[i]] = 1;
    }

    // Build prefix sum
    vector<int> prefix(n + 1, 0);
    for (int i = 1; i <= n; i++) {
        prefix[i] = prefix[i - 1] + arr[i];
    }

    // Check all segments
    for (auto [l, r] : segments) {
        int ones = prefix[r] - prefix[l - 1];
        int len = r - l + 1;
        int zeros = len - ones;
        if (ones > zeros) {
            return true;
        }
    }

    return false;
}

void solve() {
    int n, m;
    cin >> n >> m;

    vector<pair<int, int>> segments(m);
    for (int i = 0; i < m; i++) {
        cin >> segments[i].first >> segments[i].second;
    }

    int q;
    cin >> q;
    vector<int> queries(q);
    for (int i = 0; i < q; i++) {
        cin >> queries[i];
    }

    int low = 1, high = q, ans = -1;

    // Binary search for earliest valid k
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (check(mid, n, segments, queries)) {
            ans = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }

    cout << ans << '\n';
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int t;
    cin >> t;
    while (t--) {
        solve();
    }
    return 0;
}
