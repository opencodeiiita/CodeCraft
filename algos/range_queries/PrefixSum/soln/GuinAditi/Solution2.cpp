/*
Problem:
Given an array of integers nums, return the pivot index where the sum
of the numbers to the left is equal to the sum of the numbers to the right.
If no such index exists, return -1.

Approach:
1. Calculate total sum of the array.
2. Maintain a running left sum.
3. At each index, check:
   leftSum == totalSum - leftSum - nums[i]

Time Complexity: O(n)
Space Complexity: O(1)
*/

#include <iostream>
#include <vector>
using namespace std;

int pivotIndex(vector<int>& nums) {
    int totalSum = 0;
    for (int num : nums)
        totalSum += num;

    int leftSum = 0;
    for (int i = 0; i < nums.size(); i++) {
        if (leftSum == totalSum - leftSum - nums[i])
            return i;
        leftSum += nums[i];
    }
    return -1;
}

int main() {
    vector<int> nums = {1, 7, 3, 6, 5, 6};
    cout << pivotIndex(nums);
    return 0;
}
