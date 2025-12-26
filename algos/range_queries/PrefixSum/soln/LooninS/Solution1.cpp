// Given an integer array nums, handle multiple queries of the following type:

//    Calculate the sum of the elements of nums between indices left and right
//    inclusive where left <= right.

// Implement the NumArray class:

//    NumArray(int[] nums) Initializes the object with the integer array nums.
//    int sumRange(int left, int right) Returns the sum of the elements of nums
//    between indices left and right inclusive (i.e. nums[left] + nums[left + 1]
//    + ... + nums[right]).

// This is a easy problem. The question itself hints that we can use the prefix
// sum array to solve it.
//
// prefix sum array is an array of size n+1 where the ith element is the sum of
// the first i elements. So it stores a cumlative sum of all the elements.

#include <bits/stdc++.h>

using namespace std;

class NumArray {
private:
  vector<int> prefix; // create a prefix sum array

public:
    // Time Complexity of constructor is O(n)
    // Space Complexity of constructor is O(n)
  NumArray(vector<int> &nums) {
    int n = nums.size();
    prefix.resize(n + 1); // resizing the prefix sum array to n+1
    for (int i = 0; i < n;
         i++) { // running the loop to calculate the prefix sum and store it at
                // ith index of prefix array
      prefix[i + 1] = prefix[i] + nums[i];
    }
  }

// Time Complexity of sumRange is O(1)  
  int sumRange(int left, int right) {
    return prefix[right+1] - prefix[left];
  }; // now we ca return the sum of elements between left and right indices in
    // O(1) time
    // all of the processing is done in the constructor. We only use prefix sum
  // array here because we know these two queries will be asked and it is worth
  // space complexity.
};

