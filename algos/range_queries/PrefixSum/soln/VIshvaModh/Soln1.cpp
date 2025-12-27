/*
Problem:
LeetCode 303 - Range Sum Query: Immutable

Given an integer array nums, handle multiple queries of the form:
sumRange(left, right), which returns the sum of elements between
indices left and right (inclusive).

Approach:
We use a prefix sum array where:
prefix[i] = sum of elements from index 0 to i.

Then:
sum(left, right) = prefix[right] - prefix[left - 1] (if left > 0)

Time Complexity:
Preprocessing: O(N)
Each Query: O(1)

Space Complexity:
O(N)

Example:
Input:
nums = [1, 2, 3, 4, 5]
Query: sumRange(1, 3)

Output:
9
*/

#include <bits/stdc++.h>
using namespace std;

class NumArray {
public:
    vector<int>v;
    NumArray(vector<int>& nums) {
        v.resize(nums.size());
        v[0] = nums[0];
        v.push_back(0);
        for(int i=1;i<nums.size();i++)
        {
            v[i] = v[i-1] + nums[i];
        }
    }
    
    int sumRange(int left, int right) {
        if(left==0)
        {
            return v[right];
        }
        return v[right] - v[left-1];
    }       
};

/**
 * Your NumArray object will be instantiated and called as such:
 * NumArray* obj = new NumArray(nums);
 * int param_1 = obj->sumRange(left,right);
 */

 int main() {
    vector<int> nums = {1, 2, 3, 4, 5};

    NumArray obj(nums);

    cout << obj.sumRange(0, 2) << endl; // 6
    cout << obj.sumRange(1, 4) << endl; // 14

    return 0;
}