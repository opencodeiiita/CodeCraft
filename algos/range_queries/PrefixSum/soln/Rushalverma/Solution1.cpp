/*
 Problem: Running Sum of 1D Array (LeetCode 1480)
 Link: https://leetcode.com/problems/running-sum-of-1d-array/

 Approach:
 We will build a prefix-sum style array (ans) where each index i
 stores the sum of all elements from 0 to i in the original array.

 That is:
   ans[0] = nums[0]
   ans[i] = ans[i-1] + nums[i]

 This way, while iterating once through the array, we can keep
 adding the current element to the previous running sum.

 Time Complexity:  O(n)   — we traverse the array once
 Space Complexity: O(n)   — to store the running sum array
*/

#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<int> runningSum(vector<int>& nums) {
        int n = nums.size();
        vector<int> ans;

        if (n == 0) return {};

        ans.push_back(nums[0]);         

        for (int i = 1; i < n; i++) {
            ans.push_back(ans.back() + nums[i]);   
        }

        return ans;
    }
};
