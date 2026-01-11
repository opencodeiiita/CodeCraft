// 1. Problem Statement -------------------------------------------------
/*
Given an integer array nums, handle multiple range sum queries.
Each query asks for the sum of elements between indices left and right (inclusive).
The array is immutable, meaning its values never change.
*/

// 2. Approach -----------------------------------------------------------
/*
We use the Prefix Sum technique.

A prefix sum array is constructed where:
prefixSum[i] = nums[0] + nums[1] + ... + nums[i]

Using this array:
- If left == 0, the range sum is prefixSum[right]
- Otherwise, the range sum is prefixSum[right] - prefixSum[left - 1]

The prefix sum array is built once and reused for all queries.
*/

// 3. Complexity ---------------------------------------------------------
/*
Preprocessing Time: O(n)
Query Time: O(1)
Space Complexity: O(n)
*/

// Compiling Code in Java (Solution1.java) -------------------------------

package CodeCraft.algos.range_queries.PrefixSum.solnJava.dwivediprashant;

public class Solution1 {

    private int[] prefixSum;

    public Solution1(int[] nums) {
        int n = nums.length;
        prefixSum = new int[n];
        if (n == 0) return;
        prefixSum[0] = nums[0];
        for (int i = 1; i < n; i++) {
            prefixSum[i] = prefixSum[i - 1] + nums[i];
        }
    }

    public int sumRange(int left, int right) {
        if (left == 0) {
            return prefixSum[right];
        }
        return prefixSum[right] - prefixSum[left - 1];
    }

    public static void main(String[] args) {
        int[] nums = {1, 2, 3, 4, 5};
        Solution1 obj = new Solution1(nums);
        System.out.println(obj.sumRange(1, 3));
    }
}
