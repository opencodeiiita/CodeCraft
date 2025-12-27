/*

Given an array nums. We define a running sum of an array as runningSum[i] = sum(nums[0]…nums[i]).

Return the running sum of nums.

*/

#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<int> runningSum(vector<int>& nums) {
        vector<int> ans(nums.size());
        ans[0] = nums[0];
        for (int i = 1; i < nums.size(); i++) {
            ans[i] = ans[i-1] + nums[i];
        }
        return ans;
    }
};

int main() {
    Solution sol;
    vector<int> vec = {1,2,3,4};
    vector<int> runningSum = sol.runningSum(vec);
    for (auto el: runningSum) {
        cout << el << " ";
    }
    cout << endl;
}