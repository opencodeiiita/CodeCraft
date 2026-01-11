/*
    Problem: Range Sum Query - Immutable (LeetCode 303)
    Link: https://leetcode.com/problems/range-sum-query-immutable/

    Approach: Prefix Sum Array
    We can precompute the prefix sums of the array such that:
    prefix[i] = nums[0] + nums[1] + ... + nums[i]

    Then, the sum of the range [left, right] can be calculated as:
    sumRange(left, right) = prefix[right] - prefix[left - 1]

    Time Complexity:
    - Constructor: O(N) to build the prefix sum array.
    - sumRange: O(1) per query.

    Space Complexity: O(N) to store the prefix sum array.
*/

#include <vector>
#include <iostream>

using namespace std;

class NumArray {
private:
    vector<int> prefix;

public:
    NumArray(vector<int>& nums) {
        int n = nums.size();
        prefix.resize(n);
        if (n == 0) return;

        prefix[0] = nums[0];
        for (int i = 1; i < n; i++) {
            prefix[i] = prefix[i - 1] + nums[i];
        }
    }

    int sumRange(int left, int right) {
        if (left == 0) {
            return prefix[right];
        }
        return prefix[right] - prefix[left - 1];
    }
};

/**
 * Your NumArray object will be instantiated and called as such:
 * NumArray* obj = new NumArray(nums);
 * int param_1 = obj->sumRange(left,right);
 */
