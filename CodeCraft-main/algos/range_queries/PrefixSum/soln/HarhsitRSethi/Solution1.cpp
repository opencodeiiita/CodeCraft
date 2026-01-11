/*
    Problem: Range Sum Query - Immutable (LeetCode 303)
    Link: https://leetcode.com/problems/range-sum-query-immutable/

    Approach: Prefix Sum Array
    We can precompute the prefix sums of the array such that:
    prefix[i] = nums[0] + nums[1] + ... + nums[i]

    Then, the sum of the range [left, right] can be calculated as:
    sumRange(left, right) = prefix[right] - prefix[left - 1]

    Time Complexity:
    - NumArray: O(N) to build the prefix sum array.
    - sumRange: O(1) per query.

    Space Complexity: O(N) to store the prefix sum array.
*/

#include <vector>
#include <iostream>

using namespace std;

class NumArray
{
public:
    vector<int> prefix;
    NumArray(vector<int> &nums)
    {
        for (int i = 0; i < nums.size(); i++)
        {
            if (i == 0)
                prefix.push_back(nums[i]);
            else
                prefix.push_back(nums[i] + prefix[i - 1]);
        }
    }

    int sumRange(int left, int right)
    {
        if (left == 0)
            return prefix[right];
        else
            return prefix[right] - prefix[left - 1];
    }
};

/**
 * Your NumArray object will be instantiated and called as such:
 * NumArray* obj = new NumArray(nums);
 * int param_1 = obj->sumRange(left,right);
 */