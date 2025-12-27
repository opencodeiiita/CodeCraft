/*
Given an integer array nums, handle multiple queries of the following type:

Calculate the sum of the elements of nums between indices left and right inclusive where left <= right.
Implement the NumArray class:

NumArray(int[] nums) Initializes the object with the integer array nums.
int sumRange(int left, int right) Returns the sum of the elements of nums between indices left and right inclusive (i.e. nums[left] + nums[left + 1] + ... + nums[right])

Approach : instead of calculating both the left and right sum then subtracting we find the prefix sum array and subtract in one go which if more efficient
Time complexity : O(n) because of the for loop
Space complexity : O(n) we create a prefixSum vector
*/
class NumArray {
public:
    vector<int> pSum;
    NumArray(vector<int>& nums) {
        int s=nums.size();
        pSum.resize(s);
        pSum[0]=nums[0];
        for(int i=1;i<s;i++)
        pSum[i]=pSum[i-1]+nums[i];
    }
    
    int sumRange(int left, int right) {
        if(left!=0)
        return pSum[right]-pSum[left-1];
        else return pSum[right];
    }
};
