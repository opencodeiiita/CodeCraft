/*
Problem:
Given an array nums, find the minimum positive starting value such that
the cumulative sum is always at least 1.

Approach:
Track the running sum and find the minimum prefix sum.
The required start value is 1 - minimumPrefixSum.

Time Complexity: O(n)
Space Complexity: O(1)
*/

#include <iostream>
#include <vector>
using namespace std;

int minStartValue(vector<int>& nums) {
    int prefixSum = 0;
    int minPrefix = 0;

    for (int num : nums) {
        prefixSum += num;
        minPrefix = min(minPrefix, prefixSum);
    }

    return 1 - minPrefix;
}

int main() {
    vector<int> nums = {-3, 2, -3, 4, 2};
    cout << minStartValue(nums);
    return 0;
}
