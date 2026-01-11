// Given an array nums. We define a running sum of an array as runningSum[i] =
// sum(nums[0]…nums[i]).
// Return the running sum of nums.

// Solution:
#include <vector>
using std::vector;

// Time Complexity: O(N) as we iterate through the entire array of nums
class Solution {
public:
  vector<int> runningSum(vector<int> &nums) {
    vector<int> res(nums.size());         // make a vector of size nums.size()
    for (int i = 0; i < nums.size(); i++) // for each element in nums
      res[i] = nums[i] +
               (i ? res[i - 1] : 0); // add nums[i] to the sum of the previous
                                     // elements of nums stored in res
    return res;
  }
};
