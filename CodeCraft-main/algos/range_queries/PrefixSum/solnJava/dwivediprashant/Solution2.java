// 1 . Problem statement ---------------------------------------------
// Given an integer array of size n, construct a prefix sum array where each index i stores the sum of elements from index 0 to i in the original array.

//i.e. :-  prefix[i] = nums[0] + nums[1] + ... + nums[i]

//2. Approach-----------------------------------------------------------
/*The idea is incremental accumulation.

Create a new array prefix of the same size as the input array.

Set prefix[0] equal to nums[0].

For each index i from 1 to n-1:

Add the current element nums[i] to the previous prefix sum prefix[i-1].

Store the result in prefix[i].

This avoids recomputing sums repeatedly and builds results in a single pass.*/

//3.  Complexity --------------------------------
/*Time Complexity: O(n)
One pass through the array.

Space Complexity: O(n)
Extra array used to store prefix sums. */

//compiling code in java ----------------------------------------------------------------
package CodeCraft.algos.range_queries.PrefixSum.solnJava.dwivediprashant;
import java.util.*;

public class Solution2{
    public static void takeInp(int[]nums){
        Scanner sc=new Scanner(System.in);
        for(int i=0;i<nums.length;i++){
            nums[i]=sc.nextInt();
        }
        sc.close();
    }
    public static int[] getPrefixSum(int[]nums){
        int n=nums.length;
        int[] prefixSum=new int[n];
        prefixSum[0]=nums[0];
        for(int i=1;i<n;i++){
            prefixSum[i]=prefixSum[i-1]+nums[i];
        }
        return prefixSum;
    }
    public static void printResult(int[] prefixSum){
        for(int i=0;i<prefixSum.length;i++){
            System.out.print(prefixSum[i]+" ");
        }
    }
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        System.out.print("Enter size of array : ");
        int n=sc.nextInt();
        int[] nums=new int[n];
        System.out.println("Enter values in array : ");
        takeInp(nums);
        int[] prefixSum=getPrefixSum(nums);
        printResult(prefixSum);
        sc.close();
    }
}