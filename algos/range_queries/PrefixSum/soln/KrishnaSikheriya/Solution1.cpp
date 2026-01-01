/**
 * Problem: Range Sum Query
 *
 * Short Problem Statement:
 * Given an array of integers and multiple queries,
 * each query asks for the sum of elements in a subarray [L, R].
 *
 * Approach (Prefix Sum):
 * 1. Build a prefix sum array where:
 *      prefix[i] = sum of elements from index 1 to i
 * 2. For any range [L, R], compute the sum in O(1) time as:
 *      sum(L, R) = prefix[R] - prefix[L - 1]
 *
 * Time Complexity:
 * - Preprocessing: O(N)
 * - Each Query: O(1)
 *
 * Space Complexity:
 * - O(N) for prefix sum array
 *
 * Example:
 * Input:
 * 5
 * 1 2 3 4 5
 * 3
 * 1 3
 * 2 5
 * 3 3
 *
 * Output:
 * 6
 * 14
 * 3
 */

#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;

    // Original array (1-based indexing)
    vector<int> arr(n + 1);
    for (int i = 1; i <= n; i++) {
        cin >> arr[i];
    }

    // Prefix sum array
    // prefix[i] stores sum of elements from index 1 to i
    vector<long long> prefix(n + 1, 0);
    for (int i = 1; i <= n; i++) {
        prefix[i] = prefix[i - 1] + arr[i];
    }

    int q;
    cin >> q;

    // Process queries
    while (q--) {
        int l, r;
        cin >> l >> r;
        long long rangeSum = prefix[r] - prefix[l - 1];
        cout << rangeSum << '\n';
    }

    return 0;
}
