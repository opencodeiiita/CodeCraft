/*
Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.

A subarray is a contiguous non-empty sequence of elements within an array.

Problem Link: https://leetcode.com/problems/subarray-sum-equals-k/description/?envType=problem-list-v2&envId=prefix-sum

Time: O(n)
Space: O(n)

*/

#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        unordered_map<int, int> mp;
        mp[0] = 1;
        int pre = 0, ans = 0;
        for (auto el: nums) {
            pre += el;
            int diff = pre - k;
            ans += mp[diff];
            mp[pre]++;
            // cout << ans << endl;
        }
        return ans;
    }
};

int main() {
    Solution sol;
    vector<int> vec = {1,2,3};
    cout << "Answer: " << sol.subarraySum(vec, 3) << endl;
}