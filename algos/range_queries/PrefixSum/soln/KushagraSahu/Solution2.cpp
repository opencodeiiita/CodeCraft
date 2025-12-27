/* 
Given an array nums. We define a running sum of an array as runningSum[i] = sum(nums[0]…nums[i]).
Return the running sum of nums.
Approach : the running sum is basically the prefixSum array so we calculate the prefixSum array using a for loop
Time Complexity : O(n) because of the for loop
Space Complexity : O(n) because of creating the prefixSum vector
*/
class Solution {
public:
    vector<int> rSum;
    vector<int> runningSum(vector<int>& nums) {
        int s=nums.size();
        rSum.resize(s);
        rSum[0]=nums[0];
        for(int i=1;i<s;i++)
        rSum[i]=rSum[i-1]+nums[i];
        return rSum;
    }
};
