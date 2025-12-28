/**
 * Problem: Range Addition (Classic)
 *
 * Short Problem Statement:
 * Given an integer N (size of array, initially all zeros) and Q update queries.
 * Each query consists of (L, R, X), meaning add X to all elements in the
 * range [L, R] (0-indexed). Return/Print the final array after all updates.
 *
 * Approach:
 * 1. Use a Difference Array `diff` of size N+1 initialized to 0.
 * 2. For each query (L, R, X):
 * - Add X to diff[L] (starts the addition effect).
 * - Subtract X from diff[R+1] (cancels the effect after index R).
 * 3. Compute the prefix sum of the `diff` array to get the actual values.
 * - arr[i] = diff[i] + arr[i-1]
 *
 * Time Complexity: O(N + Q)
 * - O(Q) to process updates.
 * - O(N) to compute prefix sums.
 * Space Complexity: O(N) for the difference array.
 *
 * Example I/O:
 * Input:
 * 5 3          (N=5, Q=3)
 * 0 2 10       (Add 10 to indices 0 to 2)
 * 1 4 20       (Add 20 to indices 1 to 4)
 * 2 3 5        (Add 5 to indices 2 to 3)
 *
 * Output:
 * 10 30 35 25 20
 *
 * Explanation:
 * Init: [0, 0, 0, 0, 0]
 * Q1:   [10, 10, 10, 0, 0]
 * Q2:   [10, 30, 30, 20, 20]
 * Q3:   [10, 30, 35, 25, 20]
 */

#include <iostream>
#include <vector>

using namespace std;

void solve() {
    int N, Q;
    if (!(cin >> N >> Q)) return;

    // Difference array size N+1 to handle the boundary case at R+1
    vector<int> diff(N + 1, 0);

    for (int i = 0; i < Q; ++i) {
        int l, r, x;
        cin >> l >> r >> x;
        
        // Apply difference array logic
        diff[l] += x;
        if (r + 1 < N) {
            diff[r + 1] -= x;
        }
    }

    // Compute prefix sum to reconstruct the array
    vector<int> result(N);
    int current_val = 0;
    for (int i = 0; i < N; ++i) {
        current_val += diff[i];
        result[i] = current_val;
    }

    // Output result
    for (int i = 0; i < N; ++i) {
        cout << result[i] << (i == N - 1 ? "" : " ");
    }
    cout << endl;
}

int main() {
    // Fast I/O
    ios::sync_with_stdio(0);
    cin.tie(0);

    solve();

    return 0;
}