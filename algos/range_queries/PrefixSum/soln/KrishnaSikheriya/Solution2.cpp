/**
 * Problem: Count Subarrays with Given Sum
 *
 * Short Problem Statement:
 * Given an array of integers and a value K,
 * count the number of subarrays whose sum is exactly K.
 *
 * Approach (Prefix Sum + Hash Map):
 * - Maintain a running prefix sum.
 * - If prefixSum[j] - prefixSum[i] = K,
 *   then the subarray (i+1 to j) has sum K.
 * - We store counts of prefix sums seen so far in a hash map.
 *
 * Steps:
 * 1. Initialize prefixSum = 0 and a map to store frequencies.
 * 2. For each element:
 *    - Add it to prefixSum
 *    - Check if (prefixSum - K) exists in the map
 *    - Add its frequency to the answer
 *    - Update the map with current prefixSum
 *
 * Time Complexity:
 * O(N)
 *
 * Space Complexity:
 * O(N)
 *
 * Example:
 * Input:
 * 5 5
 * 1 2 3 2 -1
 *
 * Output:
 * 2
 */

#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, k;
    cin >> n >> k;

    vector<int> arr(n);
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }

    unordered_map<long long, int> freq;
    long long prefixSum = 0;
    long long count = 0;

    // Base case: prefix sum 0 appears once
    freq[0] = 1;

    for (int i = 0; i < n; i++) {
        prefixSum += arr[i];

        // Check if there exists a prefix sum such that
        // prefixSum - previousPrefix = k
        if (freq.count(prefixSum - k)) {
            count += freq[prefixSum - k];
        }

        freq[prefixSum]++;
    }

    cout << count << '\n';
    return 0;
}
