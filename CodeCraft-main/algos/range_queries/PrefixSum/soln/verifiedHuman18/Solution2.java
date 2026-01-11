/*
PROBLEM STATEMENT:
Given an array nums. We define a running sum of an array as runningSum[i] = sum(nums[0]…nums[i]).
Return the running sum of nums.
*/

/*
Explanation:
For a given array of integers, we create a prefix sum array that keeps store of cumulative sum of all elements upto the specific index.
So for an array [a, b, c], the prefix becomes
[a, a + b, a + b + c]
*/

class Solution2 {
    public static int[] runningSum(int[] nums) {
        int[] prefix = new int[nums.length];
        prefix[0] = nums[0];
        for (int i = 1; i < nums.length; i++) {
            prefix[i] = prefix[i - 1] + nums[i];
        }  
        return prefix;
    }

    public static void main(String[] args) {
        int[] arr = {-2, 0, 3, -5, 2, -1};
        int[] sumArr = runningSum(arr);
        for (int i = 0; i < sumArr.length; i++) {
            System.out.print(sumArr[i] + " ");
        }
        
    }
}

// Time Complexity = O(n)
// Space Complexity = O(n)