/*

    Problem: Find Pivot Index (LeetCode 724)
    Link: https://leetcode.com/problems/find-pivot-index/
    Difficulty: Easy

    1. Problem Statement
    --------------------
    Given an array of integers nums, calculate the pivot index of this array.

    The pivot index is the index where the sum of all the numbers strictly
    to the left of the index is equal to the sum of all the numbers strictly
    to the index's right.

    If the index is on the left edge of the array, then the left sum is 0
    because there are no elements to the left. This also applies to the
    right edge of the array.

    Return the leftmost pivot index. If no such index exists, return -1.


    2. Approach (Prefix Sum)
    ------------------------
    - Calculate the total sum of the array.
    - Iterate through the array while maintaining a running left sum.
    - At each index i:
        - Right sum = Total sum - Left sum - nums[i]
        - If Left sum == Right sum, return i (pivot found!)
        - Otherwise, add nums[i] to left sum and continue.
    - If no pivot found, return -1.


    3. Complexity Analysis
    ----------------------
    Time Complexity:  O(N) - Single pass to compute total, another to find pivot
    Space Complexity: O(1) - Only using constant extra variables



    4. Example I/O
    --------------
    Input:  nums = [1, 7, 3, 6, 5, 6]
    Output: 3
    Explanation:
        Left sum  = nums[0] + nums[1] + nums[2] = 1 + 7 + 3 = 11
        Right sum = nums[4] + nums[5] = 5 + 6 = 11

    Input:  nums = [1, 2, 3]
    Output: -1
    Explanation: No index satisfies the pivot condition.

    Input:  nums = [2, 1, -1]
    Output: 0
    Explanation: Left sum = 0, Right sum = 1 + (-1) = 0


*/

#include <vector>
#include <iostream>
#include <numeric>

using namespace std;

class Solution
{
public:
    int pivotIndex(vector<int> &nums)
    {
        int n = nums.size();
        if (n == 0)
            return -1;

        // Calculate total sum of array
        int totalSum = 0;
        for (int num : nums)
        {
            totalSum += num;
        }

        // Iterate and check for pivot
        int leftSum = 0;
        for (int i = 0; i < n; i++)
        {
            // Right sum = total - left - current element
            int rightSum = totalSum - leftSum - nums[i];

            if (leftSum == rightSum)
            {
                return i; // Pivot found!
            }

            leftSum += nums[i];
        }

        return -1; // No pivot exists
    }
};

// Test Cases

int main()
{
    Solution sol;

    // Test Case 1
    vector<int> nums1 = {1, 7, 3, 6, 5, 6};
    cout << "Test 1: " << sol.pivotIndex(nums1) << endl; // Expected: 3

    // Test Case 2
    vector<int> nums2 = {1, 2, 3};
    cout << "Test 2: " << sol.pivotIndex(nums2) << endl; // Expected: -1

    // Test Case 3
    vector<int> nums3 = {2, 1, -1};
    cout << "Test 3: " << sol.pivotIndex(nums3) << endl; // Expected: 0

    return 0;
}
