/*
Problem:
Given an integer array of size n and an integer k,
find the maximum sum of any contiguous subarray of size k.

Approach:
We use the Prefix Sum technique.
First, we build a prefix sum array where:
prefix[i] = sum of elements from index 0 to i.

The sum of subarray from index i to i+k-1 is:
prefix[i+k-1] - prefix[i-1] (if i > 0)

We calculate the sum for all possible subarrays of size k
and keep track of the maximum.

Time Complexity:
O(n)

Space Complexity:
O(n)
*/

#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;

    vector<int> arr(n), prefix(n);
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
        prefix[i] = arr[i] + (i > 0 ? prefix[i - 1] : 0);
    }

    int maxSum = INT_MIN;

    for (int i = 0; i + k - 1 < n; i++) {
        int currentSum;
        if (i == 0)
            currentSum = prefix[i + k - 1];
        else
            currentSum = prefix[i + k - 1] - prefix[i - 1];

        maxSum = max(maxSum, currentSum);
    }

    cout << maxSum << endl;

    return 0;
}
