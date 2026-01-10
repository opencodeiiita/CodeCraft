/*
------------------------------------------------------------
LeetCode Problem: 209 - Minimum Size Subarray Sum
Difficulty: Medium
Category: Prefix Sum / Sliding Window
------------------------------------------------------------

Problem Statement:
Given an array of positive integers nums and an integer target,
return the minimal length of a contiguous subarray of which the
sum is greater than or equal to target. If there is no such
subarray, return 0.

------------------------------------------------------------
Approach 1: Prefix Sum + Two Pointers (Explicit Prefix Array)
------------------------------------------------------------

Idea:
- Precompute prefix sums to allow O(1) subarray sum calculation.
- Use two pointers on the prefix array to maintain a sliding window.
- Since all elements are positive, expanding the right pointer
  increases the sum and moving the left pointer decreases it.

Subarray Sum Formula:
sum(j..i-1) = prefix[i] - prefix[j]

Time Complexity: O(N)
Space Complexity: O(N)

------------------------------------------------------------
*/

#include <bits/stdc++.h> 
using namespace std; 
class Solution { 
    public: 
    int minSubArrayLen(int target, vector<int>& nums) { 
        vector<int> a (nums.size()+1); 
        a[0]=0; 
        for(int i=0;i<nums.size();i++){ 
            a[i+1]=a[i]+nums[i]; //prefix sum
        } 
        int i=1,j=0; 
        int minsize=nums.size(); 
        while(i<nums.size()+1){ 
            int currsum=a[i]-a[j]; 
            if(currsum<target){ 
                i++; //update pointer if sum less than target
            }
            else{ 
                if(minsize>(i-j)){
                    minsize=i-j; 
                } 
                j++; //increase lower pointer to find more possible subarrays
            } 
        } 
        if(a[nums.size()]>=target){ 
            return minsize; //if total cumulative sum is less than target then target achieving is not possible
        } 
        else { 
            return 0; 
        } 
    } 
};
/*
------------------------------------------------------------
Optimized Approach: Sliding Window (Implicit Prefix Sum)
------------------------------------------------------------

Idea:
- Instead of storing the entire prefix sum array, maintain
  the current subarray sum directly.
- This is equivalent to prefix sum logic but reduces
  extra space usage.

Key Insight:
- Because all elements are positive, the window can safely
  move forward without missing optimal solutions.

Time Complexity: O(N)
Space Complexity: O(1)

------------------------------------------------------------
*/

class Solution {
public:
    int minSubArrayLen(int target, vector<int>& nums) {
        int sum=nums[0];
        int minsize=nums.size();
        bool flag=false;//set flag for if target is not achievable
        int i=0,j=0;
        while(i<nums.size()){
            if(sum<target){
                i++;
                if(i<nums.size()){
                    sum+=nums[i];//increase sum
                }
            }
            else{
                flag=true;
                if(minsize>(i-j+1)){
                    minsize=i-j+1;//update minsize if its lesser
                }
                sum-=nums[j];
                j++;//decrease window
            }
        }
        if(flag){
            return minsize;
        }
        return 0;
    }
};
