/*
Problem Statement:
Design a class NumArray that supports:
1. Initializing the object with an integer array nums.
2. Answering multiple queries of the form sumRange(left, right),
   which returns the sum of elements from index left to right (inclusive).

Approach:
We precompute a prefix sum array where:
prefix[i] = sum of elements from index 0 to i-1

This allows us to compute the sum of any subarray [left, right] in O(1):
sumRange(left, right) = prefix[right + 1] - prefix[left]

Time & Space Complexity:
Preprocessing:
- Time:  O(n)
- Space: O(n)

Each Query:
- Time:  O(1)
- Space: O(1)
*/

#include <bits/stdc++.h>
using namespace std;

class NumArray {
public:
    vector<int> prefix;
    int n;

    NumArray(vector<int>& nums) {
        n = nums.size();
        prefix.push_back(0);
        for (int i = 0; i < n; i++) {
            prefix.push_back(nums[i] + prefix[i]);
        }
    }

    int sumRange(int left, int right) {
        return prefix[right + 1] - prefix[left];
    }
};

/**
 * Your NumArray object will be instantiated and called as such:
 * NumArray* obj = new NumArray(nums);
 * int param_1 = obj->sumRange(left,right);
 */

