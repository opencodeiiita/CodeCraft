/*
Given a binary array nums and an integer k, return the maximum number of consecutive 1's in the array if you can flip at most k 0's.

Problem Link: https://leetcode.com/problems/max-consecutive-ones-iii/description/?envType=problem-list-v2&envId=prefix-sum

Time: O(n)
Space: O(1)

*/

#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int longestOnes(vector<int>& nums, int k) {
        int s = -1, e = 0, n = nums.size();
        int best = 0, curr = 0, currFlips = 0;
        while (e < n) {
            if (nums[e] == 1) {
                if (s == -1) {
                    s = e;
                }
            }
            else {
                if (currFlips < k) {
                    if (s == -1) {
                        s = e;
                    }
                    currFlips++;
                }
                else if (s != -1){
                    while (nums[s] != 0) {
                        s++;
                    }
                    s++;
                }
            }
            if (s != -1) {
                curr = e - s + 1;
                best = max(best, curr);
            }
            e++;
        }
        return best;
    }
};

int main() {
    Solution sol;
    vector<int> vec = {1,1,1,0,0,0,1,1,1,1,0};
    cout << "Answer: " << sol.longestOnes(vec, 2) << endl;
}