/*
 * Problem: Range Addition (Standard Easy Problem)
 *
 * Problem Statement:
 * Given an integer N (size of array) and Q (number of queries).
 * Initially, the array has all zeros.
 * Each query consists of three integers L, R, and Val.
 * For each query, add 'Val' to all elements in the range [L, R] (1-based indexing).
 * Finally, print the resulting array.
 *
 * Approach:
 * We use the Difference Array technique to handle range updates in O(1).
 * 1. Create a difference array 'diff' of size N+2 initialized to 0.
 * 2. For each update (L, R, Val), perform:
 * diff[L] += Val;
 * diff[R+1] -= Val;
 * 3. Compute the prefix sum of the 'diff' array to get the final values.
 *
 * Time Complexity: O(N + Q)
 * Space Complexity: O(N)
 */

#include <iostream>
#include <vector>

using namespace std;

void solve() {
    int N, Q;
    if (!(cin >> N >> Q)) return;

    // 1-based indexing, so size is N+2
    vector<long long> diff(N + 2, 0);

    for (int i = 0; i < Q; i++) {
        int L, R, Val;
        cin >> L >> R >> Val;
        diff[L] += Val;
        diff[R + 1] -= Val;
    }

    long long currentVal = 0;
    for (int i = 1; i <= N; i++) {
        currentVal += diff[i];
        cout << currentVal << " ";
    }
    cout << endl;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    solve();
    return 0;
}