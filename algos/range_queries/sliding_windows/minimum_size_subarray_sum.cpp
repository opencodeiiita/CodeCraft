/*
Problem: 209. Minimum Size Subarray Sum
Link: https://leetcode.com/problems/minimum-size-subarray-sum/

Approach:
We use the Sliding Window technique.
Maintain a window [i, j] and keep adding elements until the sum >= target.
Then try to shrink the window from the left to find the minimum length.

Algorithm:
1. Initialize two pointers i and j at 0.
2. Expand the window by moving j and adding nums[j] to sum.
3. When sum >= target:
   - Update the minimum length.
   - Shrink the window by removing nums[i] and increment i.
4. Continue until j reaches the end.

Time Complexity: O(n)
Space Complexity: O(1)
*/

#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int minSubArrayLen(int target, vector<int>& nums) {
        int n = nums.size();
        int i = 0, j = 0;
        int sum = 0;
        int minLen = INT_MAX;

        while (j < n) {
            sum += nums[j];

            while (sum >= target) {
                minLen = min(minLen, j - i + 1);
                sum -= nums[i];
                i++;
            }
            j++;
        }

        return (minLen == INT_MAX) ? 0 : minLen;
    }
};
