/* https://leetcode.com/problems/range-sum-query-immutable/submissions/1866932864/
  PROBLEM STATEMENT: Given an integer array nums, handle multiple queries of the following type:

Calculate the sum of the elements of nums between indices left and right inclusive where left <= right.
Implement the NumArray class:

NumArray(int[] nums) Initializes the object with the integer array nums.
int sumRange(int left, int right) Returns the sum of the elements of nums between indices left and right inclusive (i.e. nums[left] + nums[left + 1] + ... + nums[right]).
*/

class NumArray {
public:
    vector<int> prefix;
    NumArray(vector<int>& nums) {
        int n = nums.size();
        prefix.resize(n);
        prefix[0] = nums[0]; //assigning prefix of 1st element as nums[0]
        for(int i=1; i<n; i++)  prefix[i] = prefix[i-1] + nums[i]; //assigning prefix[i] as the sum of all previous cumulative prefixes + current nums[i]
    }
    
    int sumRange(int left, int right) {
        if(left == 0)   return prefix[right];  //avoiding prefix[-1] and returning the answer as prefix of right element
        else    return prefix[right] - prefix[left-1];
    }
};

//T.C.:  O(n)
//S.C.:  O(n)
