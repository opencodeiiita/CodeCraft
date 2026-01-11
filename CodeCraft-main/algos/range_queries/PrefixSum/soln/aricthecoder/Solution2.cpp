/*

Given an array nums. We define a running sum of an array as 
runningSum[i] = nums[0] + nums[1] + ... + nums[i]
Return the running sum of nums.


Approach : Prefix Sum
Traverse the array from left to right and nums[i] += nums[i+1]
Add previous element to current element


Time Complexity:  O(n)
Space Complexity: O(1)
*/

#include <bits/stdc++.h>
using namespace std;

int main(){
    int n;
    cin>>n;
    vector<int> nums;
    for(int i = 0; i<n; i++) cin>>nums[i];

    for(int i = 1; i<n; i++)  nums[i] = nums[i-1];

    for(int i = 0; i<n; i++) cout<< nums[i] <<" ";
    cout<<endl;
}

