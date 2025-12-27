/*
Problem: 209. Minimum Size Subarray Sum
Link: https://leetcode.com/problems/minimum-size-subarray-sum/

Approach:
We use the Sliding Window technique to find the smallest subarray
whose sum is greater than or equal to the target value.

The window is expanded by moving the right pointer and adding elements
to the current sum. Once the sum becomes >= target, we shrink the window
from the left to minimize its size while maintaining the condition.

Algorithm:
1. Initialize two pointers: left and right at index 0.
2. Add nums[right] to the current sum and move right forward.
3. When current sum >= target:
   - Update the minimum subarray length.
   - Subtract nums[left] from sum and move left forward to shrink window.
4. Continue until the right pointer reaches the end of the array.
5. If no valid subarray is found, return 0.

Time Complexity:
- O(n), where n is the number of elements in the array.
  Each element is processed at most twice.

Space Complexity:
- O(1), as only constant extra space is used.
*/

#include <vector>
#include <climits>

using namespace std;

class Solution {
public:
    int minSubArrayLen(int target, vector<int>& nums) {
        int left = 0;
        int currentSum = 0;
        int minLength = INT_MAX;

        for (int right = 0; right < nums.size(); right++) {
            currentSum += nums[right];

            // Shrink the window as long as the condition is satisfied
            while (currentSum >= target) {
                minLength = min(minLength, right - left + 1);
                currentSum -= nums[left];
                left++;
            }
        }

        return (minLength == INT_MAX) ? 0 : minLength;
    }
};
