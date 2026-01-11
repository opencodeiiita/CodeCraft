/*
    Problem: Running Sum of 1d Array (LeetCode 1480)
    Link: https://leetcode.com/problems/running-sum-of-1d-array/

    Approach: Prefix Sum (In-place)
    We can iterate through the array and update each element to be the sum of itself and the previous element.
    nums[i] += nums[i-1] for i > 0.

    This creates the running sum array in-place without using extra space (excluding the output vector).

    Time Complexity: O(N) where N is the number of elements.
    Space Complexity: O(1) if we ignore the output array space, or O(N) if we create a new vector.
    (This implementation returns a new vector to be clean, but modifies logic similar to in-place)
*/

#include <vector>
#include <iostream>

using namespace std;

class Solution
{
public:
    vector<int> runningSum(vector<int> &nums)
    {
        vector<int> prefix;
        prefix.push_back(nums[0]);
        for (int i = 1; i < nums.size(); i++)
            prefix.push_back(nums[i] + prefix[i - 1]);

        return prefix;
    }
};
