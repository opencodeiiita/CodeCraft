/*
    Problem: Count of Range Sum (LeetCode 327)
    Link: https://leetcode.com/problems/count-of-range-sum/
    Difficulty: Hard

    1. Problem Statement
    --------------------
    Given an integer array nums and two integers lower and upper, return the
    number of range sums that lie in [lower, upper] inclusive.

    Range sum S(i, j) is defined as the sum of the elements in nums between
    indices i and j inclusive, where i <= j.



    2. Approach (Prefix Sum + Merge Sort)
    -------------------------------------
    Key Insight:
    - Let prefix[i] = sum of nums[0..i-1], with prefix[0] = 0.
    - Range sum S(i, j) = prefix[j+1] - prefix[i].
    - We need to count pairs (i, j) where i < j and lower <= prefix[j] - prefix[i] <= upper.
    - Rearranging: prefix[j] - upper <= prefix[i] <= prefix[j] - lower.

    Algorithm (Merge Sort with Counting):
    1. Build prefix sum array.
    2. Use modified merge sort on prefix array.
    3. During merge step, for each element in right half:
       - Count elements in left half that satisfy the range condition.
       - Use two pointers to find valid range efficiently.
    4. Complete the standard merge operation.

    Why Merge Sort?
    - Left half elements come before right half in original array.
    - Left half is sorted, so we can use two pointers for counting.
    - Total complexity: O(N log N).



    3. Complexity Analysis
    ----------------------
    Time Complexity:  O(N log N) - Merge sort with linear counting per level
    Space Complexity: O(N) - For prefix array and temporary merge array


    4. Example I/O
    --------------
    Input:  nums = [-2, 5, -1], lower = -2, upper = 2
    Output: 3
    Explanation:
        Range sums: S(0,0)=-2, S(0,1)=3, S(0,2)=2, S(1,1)=5, S(1,2)=4, S(2,2)=-1
        Valid: S(0,0)=-2, S(0,2)=2, S(2,2)=-1 → 3 range sums in [-2, 2]

    Input:  nums = [0], lower = 0, upper = 0
    Output: 1

    Input:  nums = [0, -1, 1], lower = 0, upper = 0
    Output: 3
    Explanation: S(0,0)=0, S(0,2)=0, S(2,2)=0 are in range [0, 0]

   */

#include <vector>
#include <iostream>

using namespace std;

class Solution
{
private:
    int lower, upper;
    int count;

    void mergeSort(vector<long> &prefix, int left, int right)
    {
        if (left >= right)
            return;

        int mid = left + (right - left) / 2;

        // Recursively sort both halves
        mergeSort(prefix, left, mid);
        mergeSort(prefix, mid + 1, right);

        // Count valid pairs across the two halves
        // For each j in [mid+1, right], find i in [left, mid] where:
        // lower <= prefix[j] - prefix[i] <= upper
        // i.e., prefix[j] - upper <= prefix[i] <= prefix[j] - lower

        int lo = left, hi = left;
        for (int j = mid + 1; j <= right; j++)
        {
            // Find first i where prefix[i] >= prefix[j] - upper
            while (lo <= mid && prefix[lo] < prefix[j] - upper)
            {
                lo++;
            }
            // Find first i where prefix[i] > prefix[j] - lower
            while (hi <= mid && prefix[hi] <= prefix[j] - lower)
            {
                hi++;
            }
            // Count of valid i's = hi - lo
            count += (hi - lo);
        }

        // Standard merge operation
        merge(prefix, left, mid, right);
    }

    void merge(vector<long> &prefix, int left, int mid, int right)
    {
        vector<long> temp(right - left + 1);
        int i = left, j = mid + 1, k = 0;

        while (i <= mid && j <= right)
        {
            if (prefix[i] <= prefix[j])
            {
                temp[k++] = prefix[i++];
            }
            else
            {
                temp[k++] = prefix[j++];
            }
        }

        while (i <= mid)
        {
            temp[k++] = prefix[i++];
        }

        while (j <= right)
        {
            temp[k++] = prefix[j++];
        }

        for (int i = 0; i < k; i++)
        {
            prefix[left + i] = temp[i];
        }
    }

public:
    int countRangeSum(vector<int> &nums, int lower, int upper)
    {
        int n = nums.size();
        if (n == 0)
            return 0;

        this->lower = lower;
        this->upper = upper;
        this->count = 0;

        // Build prefix sum array (size n+1)
        // prefix[0] = 0, prefix[i] = nums[0] + ... + nums[i-1]
        vector<long> prefix(n + 1, 0);
        for (int i = 0; i < n; i++)
        {
            prefix[i + 1] = prefix[i] + nums[i];
        }

        // Use merge sort to count valid pairs
        mergeSort(prefix, 0, n);

        return count;
    }
};

int main()
{
    Solution sol;

    // Test Case 1
    vector<int> nums1 = {-2, 5, -1};
    cout << "Test 1: " << sol.countRangeSum(nums1, -2, 2) << endl; // Expected: 3

    // Test Case 2
    vector<int> nums2 = {0};
    cout << "Test 2: " << sol.countRangeSum(nums2, 0, 0) << endl; // Expected: 1

    // Test Case 3
    vector<int> nums3 = {0, -1, 1};
    cout << "Test 3: " << sol.countRangeSum(nums3, 0, 0) << endl; // Expected: 3

    // Test Case 4: All positive
    vector<int> nums4 = {1, 2, 3};
    cout << "Test 4: " << sol.countRangeSum(nums4, 3, 6) << endl; // Expected: 4

    return 0;
}
