#include <bits/stdc++.h>
using namespace std;

// Problem Statement: Create a class to calculate the sum of the elements of nums between indices left and right inclusive where left <= right.

//Approach: We create a prefix array whose first element is arr[0] and the i th element is
//          (i-1) th element + arr[i]

// Time Complexity: O(n) 
// Space Complexity: O(n) where n is the size of input array


class NumArray {
    vector<int> prefix;
public:
    NumArray(vector<int>& arr) {
     int n = arr.size();
    if (n == 0) return;
    
    
    prefix.resize(n);
    prefix[0] = arr[0];

    for (int i = 1; i < n; i++) {
        prefix[i] = prefix[i - 1] + arr[i];
    }

    }
    
    int sumRange(int left, int right) {
            if (left == 0) return prefix[right];
           return prefix[right] - prefix[left- 1];
        
    }
};
// Example:
// NumArray numArray = new NumArray([-2, 0, 3, -5, 2, -1]);
// numArray.sumRange(0, 2); This returns (-2 + 0 + 3 = 1)
