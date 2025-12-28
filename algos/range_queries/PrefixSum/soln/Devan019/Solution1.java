/*
    Problem: Product of Array Except Self (LeetCode 238)
    Link: https://leetcode.com/problems/product-of-array-except-self/

    Approach: Prefix Product + Suffix Product (Without Division)

    Idea:
    For each index i, the result should be:
        product of all elements to the left of i
        ×
        product of all elements to the right of i

    We compute this using two passes:
    1️⃣ Prefix pass:
        pro[i] stores the product of all elements before index i.
        pro[0] is set to 1 because there are no elements before it.

    2️⃣ Suffix pass:
        temp[i] stores the product of all elements after index i.
        temp[n-1] is set to 1 because there are no elements after it.

    Finally:
        pro[i] = pro[i] * temp[i]

    This avoids using division and works correctly even when the array
    contains zeros.

    Time Complexity:
    - O(N): Two linear passes over the array.

    Space Complexity:
    - O(N): Extra arrays for prefix and suffix products.
      (Note: This can be optimized to O(1) extra space by reusing the output array.)
*/


public class Solution1 {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int pro[] = new int [n];
        int temp[] = new int [n];
        pro[0] = 1;
        temp[n-1] = 1;
        int product = 1;

        for(int i = 0 ;i  < n ; i++)
        {
            product*= nums[i];
            if(i < n-1)
            {
                pro[i + 1] = product;
            }
        }

        product = 1;
        for(int i = n-1 ; i >= 0  ; i--)
        {
            product= product * nums[i];
            if(i > 0)
            {
                temp[i-1] = product;
            }
            pro[i] = pro[i] * temp[i];
            
        }
        return pro;
    }
}
/**
 * Your Solution object will be instantiated and called as such:
 *
 * Solution obj = new Solution();
 * int[] result = obj.productExceptSelf(nums);
 *
 * Where:
 * nums   -> input integer array
 * result-> array where result[i] is the product of all elements
 *          in nums except nums[i]
 */
