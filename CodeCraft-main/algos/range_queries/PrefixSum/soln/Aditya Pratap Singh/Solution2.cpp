/*
------------------------------------------------------------
Problem Statement: Running Sum of 1D Array (LeetCode 1480)

Short Problem Statement:
Given an array nums, return the running sum of the array,
where runningSum[i] is the sum of all elements from index
0 to i.

------------------------------------------------------------
Approach (Using Prefix Sum):

We construct a prefix sum array where:
prefixSum[i] = prefixSum[i - 1] + nums[i]

The first element remains the same since it has no
previous elements.

------------------------------------------------------------
Time Complexity:
- O(n), where n is the size of the array

Space Complexity:
- O(n) for the prefix sum array

------------------------------------------------------------
Example:
Input:
nums = [1, 2, 3, 4]

Output:
[1, 3, 6, 10]

------------------------------------------------------------
*/

#include <bits/stdc++.h>
using namespace std;

class Solution
{
public:
    vector<int> runningSum(vector<int> &nums)
    {
        int n = nums.size();
        vector<int> prefixSumArray(n);

        prefixSumArray[0] = nums[0];
        for (int i = 1; i < n; i++)
        {
            prefixSumArray[i] = prefixSumArray[i - 1] + nums[i];
        }

        return prefixSumArray;
    }
};
