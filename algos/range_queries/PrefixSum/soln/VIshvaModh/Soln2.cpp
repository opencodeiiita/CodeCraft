/*
1480. Running Sum of 1d Array
Given an array nums. We define a running sum of an array as runningSum[i] = sum(nums[0]…nums[i]).

Return the running sum of nums.

Soln:
Prefix Sum will be the ans

Time complexity =O(n);
*/

#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<int> runningSum(vector<int>& nums) {
        vector<int>pf(nums.size());
        pf[0] = nums[0];
        for(int i=1;i<nums.size();i++)
        {
            pf[i] = pf[i-1] + nums[i];
        }
        return pf;
    }
};

int main()
{
    vector<int>arr={1,2,3,4,5};
    Solution obj;
    vector<int> rs=obj.runningSum(arr);
    for (int i = 0; i<rs.size(); i++)
    {
        cout<<rs[i]<<" ";
    }
    cout<<endl;
}
