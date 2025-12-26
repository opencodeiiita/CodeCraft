class Solution {
public:
    vector<int> runningSum(vector<int>& nums) {
        int n = nums.size();
        vector<int> ans;
        if(n==0){ return {};}
        ans.push_back(nums[0]);
        for(int i=1;i<n;i++){
            ans.push_back(nums[i]+ans.back());
        }
        return ans;
    }
};