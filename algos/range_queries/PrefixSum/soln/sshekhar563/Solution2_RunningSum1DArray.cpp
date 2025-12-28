/*
 * Problem: Running Sum of 1D Array (LeetCode #1480)
 * Link: https://leetcode.com/problems/running-sum-of-1d-array/
 * 
 * Approach using Prefix Sums:
 * - runningSum[i] = sum of all elements from index 0 to i
 * - Each element becomes the cumulative sum up to that point
 * - Can be done in-place to save space
 * 
 * Time Complexity: O(N) - single pass through array
 * Space Complexity: O(1) - in-place modification (excluding output)
 * 
 * Example I/O:
 * Input:  nums = [1, 2, 3, 4]
 * Output: [1, 3, 6, 10]
 * Explanation: Running sum = [1, 1+2, 1+2+3, 1+2+3+4]
 * 
 * Input:  nums = [3, 1, 2, 10, 1]
 * Output: [3, 4, 6, 16, 17]
 */

#include <vector>
using namespace std;

class Solution {
public:
    vector<int> runningSum(vector<int>& nums) {
        int n = nums.size();
        
        // Build running sum in-place
        for (int i = 1; i < n; i++) {
            nums[i] += nums[i - 1];
        }
        
        return nums;
    }
};

/*
 * Alternative approach (without modifying input):
 * 
 * vector<int> runningSum(vector<int>& nums) {
 *     vector<int> result(nums.size());
 *     result[0] = nums[0];
 *     for (int i = 1; i < nums.size(); i++) {
 *         result[i] = result[i-1] + nums[i];
 *     }
 *     return result;
 * }
 */
