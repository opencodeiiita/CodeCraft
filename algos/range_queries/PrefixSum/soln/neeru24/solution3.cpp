/*
Problem Statement:
Given an array and an integer K, find the maximum sum of any
subarray of size K.

Approach (Prefix Sum):
Using prefix sums, sum of subarray [i, i+K-1] can be calculated
in O(1). We try all possible windows and keep track of the maximum.

Time Complexity:
O(n)

Space Complexity:
O(n)

Example:
Input:
7 3
2 1 5 1 3 2 1

Output:
9
*/

#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;

    vector<int> arr(n), prefix(n);
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }

    prefix[0] = arr[0];
    for (int i = 1; i < n; i++) {
        prefix[i] = prefix[i - 1] + arr[i];
    }

    int maxSum = INT_MIN;
    for (int i = k - 1; i < n; i++) {
        int currSum = prefix[i] - (i >= k ? prefix[i - k] : 0);
        maxSum = max(maxSum, currSum);
    }

    cout << maxSum << "\n";
    return 0;
}
