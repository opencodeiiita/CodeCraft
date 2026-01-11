/*
303. Range Sum Query - Immutable
Given an integer array nums, handle multiple queries of the following type:

Calculate the sum of the elements of nums between indices left and right inclusive where left <= right.

Soln:
Calculate Prefix sum and return values ps[r]-ps[l-1] to get the value of sum between r and l in the vector.

Time Complexity:
Preprocessing: O(N)
Each Query: O(1)
Space Complexity: O(N)
*/

#include <bits/stdc++.h>
using namespace std;

class NumArray {
public:
    vector<int>ps;
    NumArray(vector<int>& nums) {
        
        int n=nums.size();
        ps.resize(n);
        ps[0]=nums[0];

        int i;
        for(i=1;i<n;i++)
        ps[i]=nums[i]+ps[i-1];
    }
    
    int sumRange(int l, int r) {
        if(l==0)
        return ps[r];

        int v=ps[r]-ps[l-1];
        return v;
    }
};

/**
 * Your NumArray object will be instantiated and called as such:
 * NumArray* obj = new NumArray(nums);
 * int param_1 = obj->sumRange(left,right);
 */

int main()
{
    int n;
    cin >>n;
    vector<int> nums = {-2, 0, 3, -5, 2, -1};

    NumArray obj=NumArray(nums);

    cout << obj.sumRange(0, 2)<<endl;
    cout << obj.sumRange(2, 5)<<endl;
    cout << obj.sumRange(0, 5)<<endl;
}
