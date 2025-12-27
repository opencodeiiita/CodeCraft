/*Problem: Leetcode 303- Range Sum Query- Immutable
Approach: We create a prefix sum array and store running sum in the array
prefix[i]=prefix[1]+....prefix[i]

sumRange[left,right]= prefix[right]-prefix[left-1]
if(left=0) then sumRange[0,right]=prefix[right]

TC: O(n) for computing prefix Sum Array
SC: O(n) to store prefix Sum Array
*/
#include <bits/stdc++.h> 
using namespace std;

class NumArray {
public:
    vector<int> prefix;
    NumArray(vector<int>& nums) {
        int x = 0;
        for (int i : nums) {
            x += i;
            prefix.push_back(x);
        }
    }

    int sumRange(int left, int right) {
        if (left > 0)
            return prefix[right] - prefix[left - 1];
        else
            return prefix[right];
    }
};

/**
 * Your NumArray object will be instantiated and called as such:
 * NumArray* obj = new NumArray(nums);
 * int param_1 = obj->sumRange(left,right);
 */
