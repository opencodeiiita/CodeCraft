/*
Problem: 209. Minimum Size Subarray Sum
Link: https://leetcode.com/problems/minimum-size-subarray-sum/

Approach:
We use Prefix Sum combined with Binary Search.

Since all elements in the array are positive, the prefix sum array
is strictly increasing. For each starting index, we binary search
the minimum ending index such that the subarray sum is >= target.

Algorithm:
1. Build a prefix sum array where prefix[i] stores sum of first i elements.
2. For each index i:
   - Compute requiredSum = target + prefix[i].
   - Binary search the prefix array to find the smallest index j
     such that prefix[j] >= requiredSum.
3. Update the minimum subarray length using (j - i).
4. If no valid subarray is found, return 0.

Time Complexity:
- O(n log n), due to binary search for each index.

Space Complexity:
- O(n), for the prefix sum array.
*/

#include <vector>
#include <climits>
#include <algorithm>

using namespace std;

class Solution {
public:
    int minSubArrayLen(int target, vector<int>& nums) {
        int n = nums.size();
        vector<int> prefixSum(n + 1, 0);

        // Build prefix sum array
        for (int i = 0; i < n; i++) {
            prefixSum[i + 1] = prefixSum[i] + nums[i];
        }

        int minLength = INT_MAX;

        // Binary search for each starting index
        for (int i = 0; i < n; i++) {
            int requiredSum = target + prefixSum[i];
            auto it = lower_bound(prefixSum.begin(), prefixSum.end(), requiredSum);

            if (it != prefixSum.end()) {
                int j = it - prefixSum.begin();
                minLength = min(minLength, j - i);
            }
        }

        return (minLength == INT_MAX) ? 0 : minLength;
    }
};
