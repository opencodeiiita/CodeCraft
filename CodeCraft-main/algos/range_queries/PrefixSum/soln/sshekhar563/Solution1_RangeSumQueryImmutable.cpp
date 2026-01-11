/*
 * Problem: Range Sum Query - Immutable (LeetCode #303)
 * Link: https://leetcode.com/problems/range-sum-query-immutable/
 * 
 * Approach using Prefix Sums:
 * - Precompute cumulative sums in constructor
 * - For range [left, right], answer = prefix[right+1] - prefix[left]
 * - Using 1-indexed prefix array to avoid boundary checks
 * 
 * Time Complexity:
 * - Constructor: O(N) for building prefix array
 * - sumRange(): O(1) per query
 * 
 * Space Complexity: O(N) for prefix array
 * 
 * Example I/O:
 * Input: nums = [-2, 0, 3, -5, 2, -1]
 * sumRange(0, 2) -> 1  (i.e., -2 + 0 + 3 = 1)
 * sumRange(2, 5) -> -1 (i.e., 3 + (-5) + 2 + (-1) = -1)
 * sumRange(0, 5) -> -3 (i.e., -2 + 0 + 3 + (-5) + 2 + (-1) = -3)
 */

#include <vector>
using namespace std;

class NumArray {
private:
    vector<int> prefix;

public:
    NumArray(vector<int>& nums) {
        int n = nums.size();
        prefix.resize(n + 1, 0);
        
        // Build prefix sum array (1-indexed)
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }
    }
    
    int sumRange(int left, int right) {
        // Sum from left to right = prefix[right+1] - prefix[left]
        return prefix[right + 1] - prefix[left];
    }
};

/*
 * Usage:
 * NumArray* obj = new NumArray(nums);
 * int result = obj->sumRange(left, right);
 */
