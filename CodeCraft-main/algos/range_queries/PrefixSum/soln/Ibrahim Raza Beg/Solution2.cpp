/*
1480. Running Sum of 1d Array
Given an array nums. We define a running sum of an array as runningSum[i] = sum(nums[0]…nums[i]).

Return the running sum of nums.

Soln:
Prefix Sum :)

Time complexity =O(n);
Space complexity =O(1);

*/

#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<int> runningSum(vector<int>& nums) {
        int n=nums.size();
        vector<int>ps(n,0);

        ps[0]=nums[0];
        for(int i=1;i<n;i++)
        ps[i]=nums[i]+ps[i-1];

        return ps;
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
