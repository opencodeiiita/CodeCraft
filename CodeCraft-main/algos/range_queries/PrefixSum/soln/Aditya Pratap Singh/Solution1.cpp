/*
------------------------------------------------------------
Problem Statement: Range Sum Query - Immutable (LeetCode 303)
Given an integer array nums, handle multiple queries of the following type:

Calculate the sum of the elements of nums between indices left and right inclusive where left <= right.
Implement the NumArray class:

NumArray(int[] nums) Initializes the object with the integer array nums.
int sumRange(int left, int right) Returns the sum of the elements of nums between indices left and right inclusive (i.e. nums[left] + nums[left + 1] + ... + nums[right]).

------------------------------------------------------------
Approach (Using Prefix Sum):

We preprocess the array to create a prefix sum array where:
prefix[i] = sum of elements from index 0 to i.

Then, the sum of elements in range [left, right] is:
- prefix[right], if left == 0
- prefix[right] - prefix[left - 1], otherwise

This allows each query to be answered in O(1) time.

------------------------------------------------------------
Time Complexity:
- Preprocessing: O(n)
- Each query: O(1)

Space Complexity:
- O(n) for the prefix sum array

------------------------------------------------------------
Example:
Input:
nums = [1, 2, 3, 4]
sumRange(1, 3)

Output:
9   (2 + 3 + 4)

------------------------------------------------------------
*/

#include <bits/stdc++.h>
using namespace std;

class NumArray
{
private:
    vector<int> prefix;

public:
    // Constructor to build prefix sum array
    NumArray(vector<int> &nums)
    {
        prefix.resize(nums.size());
        prefix[0] = nums[0];

        for (int i = 1; i < nums.size(); i++)
        {
            prefix[i] = prefix[i - 1] + nums[i];
        }
    }

    // Returns sum of elements from index left to right (inclusive)
    int sumRange(int left, int right)
    {
        if (left == 0)
            return prefix[right];
        return prefix[right] - prefix[left - 1];
    }
};
