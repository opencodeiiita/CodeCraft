//  Problem1: Range Sum Query - Immutable ----Asked to find the sum of a bounded continuous range in an array (given left and right ends)
//Leetcode submission: https://leetcode.com/problems/range-sum-query-immutable/submissions/1866107240/
class NumArray {
public:
    vector<int> presum;
    NumArray(vector<int>& nums) {
        int n=nums.size();
        presum.resize(n+1,0);
        for(int i=0;i<n;i++) presum[i+1]=presum[i]+nums[i];
    }
    
    int sumRange(int left, int right) {
        return presum[right+1]-presum[left];
    }
};


//Problem 2: Running Sum of 1d Array --- Aked to find consecutive continuous sum of array. E.g.,: [1,2,4,5,2] ---> [1,1+2,1+2+4,1+2+4+5,1+2+4+5+2]
// Leetcode submission: https://leetcode.com/problems/running-sum-of-1d-array/submissions/1866109629/
class Solution {
public:
    vector<int> runningSum(vector<int>& nums) {
        int n=nums.size();
        vector<int> presum(n);
        presum[0]=nums[0];
        for(int i=1;i<n;i++){
            presum[i]=presum[i-1]+nums[i];
        }
        return presum;
    }
};

