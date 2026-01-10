/*
------------------------------------------------------------
LeetCode Problem: 560 - Subarray Sum Equals K
Difficulty: Medium
Category: Prefix Sum
------------------------------------------------------------

Problem Statement:
Given an integer array nums and an integer k, return the total
number of continuous subarrays whose sum equals k.

------------------------------------------------------------
Approach: Prefix Sum + Brute Force Enumeration
------------------------------------------------------------

Idea:
- Compute the prefix sum array where prefix[i] stores the sum of
  elements from index 0 to i-1.
- Any subarray sum from index i to j-1 can be computed in O(1) as:
  
        prefix[j] - prefix[i]

- Enumerate all possible (i, j) pairs and count how many satisfy
  prefix[j] - prefix[i] == k.

Why this works:
- Prefix sums allow constant-time subarray sum calculation.
- Checking all subarrays guarantees correctness even with
  negative numbers and zeros.

------------------------------------------------------------
Time Complexity:
- Prefix sum construction: O(N)
- Nested loops over all subarrays: O(N²)
- Total: O(N²)

Space Complexity:
- Prefix sum array: O(N)

------------------------------------------------------------
*/
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        vector<int> a (nums.size()+1); 
        a[0]=0; 
        for(int i=0;i<nums.size();i++){ 
            a[i+1]=a[i]+nums[i];
        } 
        int count=0;
        for(int i=0;i<nums.size()+1;i++){
            for(int j=i+1;j<nums.size()+1;j++){
                if(a[j]-a[i]==k){
                    count++;
                }
            }
        }
        return count;
    }
};

/*
------------------------------------------------------------
LeetCode Problem: 560 - Subarray Sum Equals K
Difficulty: Medium
Category: Prefix Sum + HashMap
------------------------------------------------------------

Problem Statement:
Given an integer array nums and an integer k, return the total
number of continuous subarrays whose sum equals k.

------------------------------------------------------------
Approach: Prefix Sum with Frequency HashMap
------------------------------------------------------------

Key Observation:
For a subarray ending at index j with sum equal to k:

    prefix[j] - prefix[i] = k
=>  prefix[i] = prefix[j] - k

Thus, for each prefix sum encountered, we need to know how many
times (prefixSum - k) has appeared previously.

Algorithm:
1. Traverse the array once while maintaining a running prefix sum.
2. Use a hashmap to store the frequency of prefix sums seen so far.
3. At each index:
   - Check if (currentPrefixSum - k) exists in the hashmap.
   - If it exists, its frequency contributes to the answer.
4. Update the frequency of the current prefix sum.

Important Detail:
- Initialize the hashmap with {0 : 1} to handle subarrays that
  start from index 0.

------------------------------------------------------------
Correctness:
- This method counts all valid subarrays ending at each index.
- Works correctly even with negative numbers and zeros.
- Avoids the need for nested loops by reusing prefix sum history.

------------------------------------------------------------
Time Complexity:
- O(N), where N is the size of the array.

Space Complexity:
- O(N) for storing prefix sum frequencies in the hashmap.

------------------------------------------------------------
*/

class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        unordered_map <int,int> fre;
        fre[0]=1;
        int sum=0;
        int count=0;
        for(int x=0;x<nums.size();x++){
            sum+=nums[x];
            if(fre.find(sum-k)!=fre.end()){
                count+=fre[sum-k];
            }
            fre[sum]++;
        }
        return count;
    }
};
