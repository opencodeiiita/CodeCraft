/*https://leetcode.com/problems/running-sum-of-1d-array/submissions/1866946136/
PROBLEM STATEMENT: Given an array nums. We define a running sum of an array as runningSum[i] = sum(nums[0]…nums[i]).
Return the running sum of nums.
*/

class Solution {
public:
    vector<int> prefix;
    vector<int> runningSum(vector<int>& nums) {
        int n = nums.size();
        prefix.resize(n);
        prefix[0] = nums[0]; //assigning 1st element as 1st element of nums
        for(int i=1; i<n; i++)  prefix[i] = prefix[i-1] + nums[i]; // assigning elements of prefix as sum of previous cumulative prefixes + nums[i]

        return prefix;
    }
};

//T.C.: O(n)
//S.C.: O(n)
