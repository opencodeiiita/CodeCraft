/*
You are given an integer array nums of length n.

A partition is defined as an index i where 0 <= i < n - 1, splitting the array into two non-empty subarrays such that:

Left subarray contains indices [0, i].
Right subarray contains indices [i + 1, n - 1].
Return the number of partitions where the difference between the sum of the left and right subarrays is even.
*/

#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int countPartitions(vector<int>& nums) {
        int sum = 0;
        for (int i : nums) sum += i;
        return (sum % 2 == 0) ? nums.size() - 1 : 0;
    }
};

int main() {
    Solution sol;
    vector<int> vec = {10,10,3,7,6};
    cout << "Answer: " << sol.countPartitions(vec) << endl;
}
