/*

Given an array nums. We define a running sum of an array as runningSum[i] = sum(nums[0]…nums[i]).
Return the running sum of nums.

Time: O(n)
Space: O(1) - no auxilary space

Link: https://leetcode.com/problems/running-sum-of-1d-array/submissions/1866571252/

*/

#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<int> runningSum(vector<int>& nums) {
        vector<int> ans(nums.size());
        ans[0] = nums[0];
        for (int i = 1; i < nums.size(); i++) {
            ans[i] = ans[i-1] + nums[i];
        }
        return ans;
    }
};