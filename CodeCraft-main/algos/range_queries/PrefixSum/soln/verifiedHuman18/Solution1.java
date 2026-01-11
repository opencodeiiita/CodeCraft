/*
PROBLEM STATEMENT:
Given an integer array nums, handle multiple queries of the following type:
Calculate the sum of the elements of nums between indices left and right inclusive where left <= right.
*/

/*
Explanation:
Given an array of integers, we create a prefix sum array that keeps store of cumulative sum of all elements upto the specific index.
So for an array [a, b, c], the prefix becomes
[a, a + b, a + b + c]
For every query we do not need to compute sum of all elements between the left and right indexes.
Rather we can just compute the difference between the cumulative sum upto the right index and that of the left index.
Thus solving the query in a single step.
*/


public class Solution1 {
    private int[] prefix;
    public Solution1(int[] nums) {
        prefix = new int[nums.length + 1];
        for (int i = 0; i < nums.length; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }
    }
    
    public int sumRange(int left, int right) {
        int sum = prefix[right + 1] - prefix[left];
        return sum;
    }

    public static void main(String[] args) {
        int[] nums = {-2, 0, 3, -5, 2, -1};
        Solution1 myObj = new Solution1(nums);
        System.out.println(myObj.sumRange(0, 2));
        System.out.println(myObj.sumRange(2, 5));
        System.out.println(myObj.sumRange(0, 5));
    }
}

// Time Complexity for precomputing prefix = O(n)
// Time Complexity for solving eaxh query = O(1)
// Space Complexity = O(n)