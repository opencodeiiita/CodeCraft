/*
Problem:
LeetCode 1480 - Running Sum of 1D Array

Given an array nums, return the running sum of nums.

Approach:
Use prefix sum technique:
result[i] = result[i - 1] + nums[i]

Time Complexity: O(N)
Space Complexity: O(N)

Example:
Input: [1,2,3,4]
Output: [1,3,6,10]
*/

#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> nums = {1, 2, 3, 4};
    vector<int> result(nums.size());

    result[0] = nums[0];
    for(int i = 1; i < nums.size(); i++)
        result[i] = result[i - 1] + nums[i];

    for(int x : result)
        cout << x << " ";

    return 0;
}
