/*
Problem Statement:
Given an array of integers and an integer K, find the number of subarrays
whose sum is equal to K.

Approach (Prefix Sum + Hash Map):
We store prefix sums and count how many times (currentPrefix - K)
has appeared before.
This helps us count valid subarrays efficiently.

Time Complexity:
O(n)

Space Complexity:
O(n)

Example:
Input:
5 5
1 2 3 2 5

Output:
2
*/

#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;

    vector<int> arr(n);
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }

    unordered_map<int, int> mp;
    mp[0] = 1;

    int prefixSum = 0, count = 0;
    for (int i = 0; i < n; i++) {
        prefixSum += arr[i];

        if (mp.find(prefixSum - k) != mp.end()) {
            count += mp[prefixSum - k];
        }

        mp[prefixSum]++;
    }

    cout << count << "\n";
    return 0;
}
