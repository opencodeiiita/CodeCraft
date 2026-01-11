/*
Problem Statement:
Given an integer array nums, return the running sum of nums.
The running sum at index i is the sum of all elements from
index 0 to index i (inclusive).

Approach:
Instead of creating a separate prefix array, we reuse the input array.
At each index i (starting from 1), we update:
nums[i] = nums[i - 1] + nums[i]

Time & Space Complexity:
- Time:  O(n)
- Space: O(1) extra space (in-place modification)

*/
#include <bits/stdc++.h>
using namespace std;


class Solution {
public:
    vector<int> runningSum(vector<int>& nums) {
        int n = nums.size();

        for (int i = 1; i < n; i++) {
            nums[i] = nums[i - 1] + nums[i];
        }

        return nums;
    }
};

