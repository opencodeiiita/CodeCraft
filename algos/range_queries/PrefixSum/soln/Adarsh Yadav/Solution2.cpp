/* Problem: Leetcode 1480- Running Sum of 1d Array

Approach: We create a prefix Sum array that stores the running sum and we output the prefix sum array .
prefix[i]=prefix[1]+prefix[2]...prefix[i]

TC: O(N)
SC: O(N)
  */

#include<bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<int> runningSum(vector<int>& nums) {
        vector<int> prefix;
        int k=0;
        for(int i : nums){
                k+=i;
                prefix.push_back(k);
        }
        return prefix;
    }
};
