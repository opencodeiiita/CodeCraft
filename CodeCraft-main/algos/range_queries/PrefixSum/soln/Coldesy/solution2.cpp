#include <bits/stdc++.h>
using namespace std;



// Problem Statement: Create a function to calculate the runningSum(i)(i.e. sum of arr[i] + all previous elements) which is basically i th                               //                    element in prefix sum array

//Approach: We create a prefix array whose first element is arr[0] and the i th element is
//          (i-1) th element + arr[i] 

// Time Complexity: O(n) 
// Space Complexity: O(n) where n is the size of input array



class Solution {
public:
    vector<int> runningSum(vector<int>& arr) {
    vector<int> prefix;
    int n = arr.size();
    prefix.resize(n);
    prefix[0] = arr[0];

    for (int i = 1; i < n; i++) {
        prefix[i] = prefix[i - 1] + arr[i];
    }
    return prefix;
    }
};
