/**
 * Problem: Range Update Queries (CSES 1651)
 * Link: https://cses.fi/problemset/task/1651/
 * Difficulty: Easy
 *
 * -------------------------
 * Short Problem Statement
 * -------------------------
 * You are given an array of N integers and Q queries of two types:
 * 1. Add a value `u` to all elements in the range [a, b].
 * 2. Query the current value at a specific position `k`.
 *
 * -------------------------
 * Approach (Difference Array + Fenwick Tree)
 * -------------------------
 * A plain Difference Array supports range updates in O(1),
 * but retrieving a single element requires computing a prefix sum,
 * resulting in O(N) per query — too slow for large Q.
 *
 * To handle both operations efficiently:
 *
 * 1. Difference Array Concept:
 *    - A range update [L, R] by +X can be represented as:
 *        diff[L]     += X
 *        diff[R + 1] -= X
 *
 * 2. Fenwick Tree (Binary Indexed Tree):
 *    - We store the difference array updates inside a Fenwick Tree.
 *    - This allows both updates and prefix-sum queries in O(log N).
 *
 * 3. Point Value Retrieval:
 *    - The final value at index `k` is:
 *        initial_array[k] + prefix_sum(diff, k)
 *
 * -------------------------
 * Time & Space Complexity
 * -------------------------
 * Time Complexity:  O((N + Q) log N)
 * Space Complexity: O(N)
 */

#include <bits/stdc++.h>
using namespace std;

const int MAXN = 200005;
long long bit[MAXN];
int n, q;

// Fenwick Tree update (1-based indexing)
void update(int idx, long long val) {
    for (; idx <= n; idx += idx & -idx) {
        bit[idx] += val;
    }
}

// Fenwick Tree prefix sum query
long long query(int idx) {
    long long sum = 0;
    for (; idx > 0; idx -= idx & -idx) {
        sum += bit[idx];
    }
    return sum;
}

void solve() {
    cin >> n >> q;

    vector<long long> initial_arr(n + 1);
    for (int i = 1; i <= n; i++) {
        cin >> initial_arr[i];
    }

    while (q--) {
        int type;
        cin >> type;

        if (type == 1) {
            // Range update: add u to [a, b]
            int a, b;
            long long u;
            cin >> a >> b >> u;
            update(a, u);
            update(b + 1, -u);
        } else {
            // Point query: get value at k
            int k;
            cin >> k;
            cout << initial_arr[k] + query(k) << '\n';
        }
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    solve();
    return 0;
}
