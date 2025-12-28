/*

    Problem: Subarray Sum Equals K (LeetCode 560)
    Link: https://leetcode.com/problems/subarray-sum-equals-k/
    Difficulty: Medium

    1. Problem Statement
    --------------------
    Given an array of integers nums and an integer k, return the total number
    of subarrays whose sum equals to k.

    A subarray is a contiguous non-empty sequence of elements within an array.


    2. Approach (Prefix Sum + HashMap)
    ----------------------------------
    Key Insight:
    If prefix[j] - prefix[i] = k, then sum of subarray (i+1, j) equals k.
    Rearranging: prefix[i] = prefix[j] - k

    Algorithm:
    - Use a hashmap to store frequency of each prefix sum seen so far.
    - Initialize map with {0: 1} (empty prefix has sum 0).
    - For each element, calculate running prefix sum.
    - Check if (prefixSum - k) exists in map:
        - If yes, add its frequency to count (these many subarrays end here with sum k).
    - Add current prefixSum to the map.

    Why this works:
    - If we've seen (prefixSum - k) before at index i, then subarray from
      i+1 to current index has sum = prefixSum - (prefixSum - k) = k.

    3. Complexity Analysis
    ----------------------
    Time Complexity:  O(N) - Single pass through the array
    Space Complexity: O(N) - HashMap to store prefix sums



    4. Example I/O
    --------------
    Input:  nums = [1, 1, 1], k = 2
    Output: 2
    Explanation: Subarrays [1,1] at index (0,1) and (1,2) have sum = 2.

    Input:  nums = [1, 2, 3], k = 3
    Output: 2
    Explanation: Subarrays [1,2] and [3] have sum = 3.

    Input:  nums = [1, -1, 0], k = 0
    Output: 3
    Explanation: Subarrays [1,-1], [-1,0], and [1,-1,0] have sum = 0.


*/

#include <vector>
#include <iostream>
#include <unordered_map>

using namespace std;

class Solution
{
public:
    int subarraySum(vector<int> &nums, int k)
    {
        int n = nums.size();
        int count = 0;
        int prefixSum = 0;

        // Map to store frequency of prefix sums
        // Initialize with {0: 1} for subarrays starting from index 0
        unordered_map<int, int> prefixCount;
        prefixCount[0] = 1;

        for (int i = 0; i < n; i++)
        {
            // Update running prefix sum
            prefixSum += nums[i];

            // Check if (prefixSum - k) exists in map
            // If yes, we found subarrays ending at index i with sum = k
            int target = prefixSum - k;
            if (prefixCount.find(target) != prefixCount.end())
            {
                count += prefixCount[target];
            }

            // Add current prefix sum to map
            prefixCount[prefixSum]++;
        }

        return count;
    }
};

int main()
{
    Solution sol;

    // Test Case 1
    vector<int> nums1 = {1, 1, 1};
    cout << "Test 1: " << sol.subarraySum(nums1, 2) << endl; // Expected: 2

    // Test Case 2
    vector<int> nums2 = {1, 2, 3};
    cout << "Test 2: " << sol.subarraySum(nums2, 3) << endl; // Expected: 2

    // Test Case 3: With negative numbers
    vector<int> nums3 = {1, -1, 0};
    cout << "Test 3: " << sol.subarraySum(nums3, 0) << endl; // Expected: 3

    // Test Case 4: Single element
    vector<int> nums4 = {3};
    cout << "Test 4: " << sol.subarraySum(nums4, 3) << endl; // Expected: 1

    return 0;
}
