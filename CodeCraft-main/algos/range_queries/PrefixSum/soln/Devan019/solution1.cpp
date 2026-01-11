/*
Problem: Range Sum Query – Immutable
Design a class NumArray that supports:
1. Initializing the object with an integer array nums
2. Answering multiple queries of the form:
      sumRange(left, right)
   which returns the sum of elements from index left to right (inclusive)

Approach: Prefix Sum
We build a prefix sum array where:

prefix[0] = 0
prefix[i] = sum of elements from index 0 to i-1

This allows us to calculate the sum of any subarray [left, right]
in constant time using the formula:

sumRange(left, right) = prefix[right + 1] - prefix[left]

Time & Space Complexity
Preprocessing:
- Time  : O(n)
- Space : O(n)

Each Query:
- Time  : O(1)
- Space : O(1)

*/

#include <bits/stdc++.h>
using namespace std;

class PrefixSum {
private:
    vector<int> prefix;  

public:
    PrefixSum(vector<int>& nums) {
        prefix.push_back(0);   

        for (int i = 0; i < nums.size(); i++) {
            prefix.push_back(prefix[i] + nums[i]);
        }
    }

    int sumRange(int left, int right) {
        return prefix[right + 1] - prefix[left];
    }
};

/*
Example

int main() {
    vector<int> nums = {1, 2, 3, 4};
    NumArray obj(nums);

    cout << obj.sumRange(1, 3);  // Output: 9
    return 0;
}

*/
