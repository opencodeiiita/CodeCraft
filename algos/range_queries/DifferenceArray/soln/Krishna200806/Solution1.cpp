/**
 * Problem: Range Update Queries (CSES 1651)
 * Link: https://cses.fi/problemset/task/1651/
 * Difficulty: Easy (as per repo classification)
 *
 * Short Problem Statement:
 * Given an array of N integers, process Q queries of two types:
 * 1. Increase value in range [a, b] by u.
 * 2. Find the current value at position k.
 *
 * Approach (Difference Array + Fenwick Tree):
 * While a standard Difference Array allows O(1) updates, calculating a point value 
 * requires O(N) time (prefix sum), which is too slow for mixed queries (O(NQ)).
 * * To solve this efficiently:
 * 1. We use the concept of a Difference Array:
 * - Update [L, R] by +X is equivalent to: 
 * diff[L] += X
 * diff[R+1] -= X
 * 2. We use a Fenwick Tree (Binary Indexed Tree) to maintain these difference updates.
 * - The BIT allows us to perform the updates and calculate prefix sums in O(log N).
 * 3. The value at index `k` is: Initial_Array[k] + Prefix_Sum_of_Diff(k).
 *
 * Time Complexity: O((N + Q) log N)
 * Space Complexity: O(N)
 */

#include <iostream>
#include <vector>

using namespace std;

const int MAXN = 200005;
long long bit[MAXN];
int n, q;

// Update operation for Fenwick Tree (1-based indexing)
void update(int idx, long long val) {
    for (; idx <= n; idx += idx & -idx) {
        bit[idx] += val;
    }
}

// Query prefix sum up to idx
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

    // Process queries
    while (q--) {
        int type;
        cin >> type;
        
        if (type == 1) {
            // Range Update: 1 a b u
            int a, b;
            long long u;
            cin >> a >> b >> u;
            // Apply difference array logic using BIT
            update(a, u);
            update(b + 1, -u);
        } else {
            // Point Query: 2 k
            int k;
            cin >> k;
            // Result is initial value + accumulated changes
            cout << initial_arr[k] + query(k) << "\n";
        }
    }
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    solve();
    return 0;
}