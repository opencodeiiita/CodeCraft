/*
Problem:
LeetCode 303 - Range Sum Query: Immutable

Given an integer array nums, handle multiple queries:
find the sum of elements between indices L and R inclusive.

Approach:
Build a prefix sum array where:
prefix[i] = sum of nums[0...i]

Then:
sum(L, R) = prefix[R] - prefix[L-1]   (if L > 0)

Time Complexity:
Preprocessing: O(N)
Each Query: O(1)

Space Complexity: O(N)

Example:
Input: nums = [-2,0,3,-5,2,-1], query(0,2)
Output: 1
*/

#include <iostream>
#include <vector>
using namespace std;

class NumArray {
    vector<long long> prefix;
public:
    NumArray(vector<int>& nums) {
        int n = nums.size();
        prefix.resize(n);
        if (n > 0) {
            prefix[0] = nums[0];
            for(int i = 1; i < n; i++)
                prefix[i] = prefix[i - 1] + nums[i];
        }
    }

    long long sumRange(int L, int R) {
        if (L == 0) return prefix[R];
        return prefix[R] - prefix[L - 1];
    }
};

int main() {
    vector<int> nums = {-2, 0, 3, -5, 2, -1};
    NumArray obj(nums);
    cout << obj.sumRange(0, 2) << endl; // 1
    cout << obj.sumRange(2, 5) << endl; // -1
    return 0;
}
