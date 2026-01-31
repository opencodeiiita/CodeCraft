/*
Problem Statement:
------------------
Given an array of integers, perform multiple range update queries. 
Each query is of the form [L, R, X] where you need to add X to all elements from index L to R (inclusive). 
Return the final updated array.

Approach:
---------
We use a Difference Array to perform range updates efficiently in O(1) time per query.

Steps:
1. Create a difference array `diff` of size n+1.
2. For each query [L, R, X]:
   - diff[L] += X
   - diff[R+1] -= X
3. Construct the final array by taking the prefix sum of `diff` and adding it to the original array.

Time Complexity:
----------------
- O(N + Q), where N = size of the array, Q = number of queries

Space Complexity:
-----------------
- O(N) for the difference array

Example I/O:
------------
Input: arr = [1,2,3,4,5], queries = [[1,3,2],[0,2,1]]
Output: [2,5,6,6,5]
Explanation:
- First query adds 2 to indices 1 to 3 => [1,4,5,6,5]
- Second query adds 1 to indices 0 to 2 => [2,5,6,6,5]
*/

#include <bits/stdc++.h>
using namespace std;

int main() {
    int n = 5;
    vector<int> arr = {1, 2, 3, 4, 5};
    int queries[][3] = {{1, 3, 2}, {0, 2, 1}};
    int q = 2;

    vector<int> diff(n + 1, 0);

    // Apply each query using difference array
    for(int i = 0; i < q; i++) {
        int l = queries[i][0];
        int r = queries[i][1];
        int val = queries[i][2];
        diff[l] += val;
        if(r + 1 < n) diff[r + 1] -= val;
    }

    // Build the final array using prefix sum
    arr[0] += diff[0];
    for(int i = 1; i < n; i++) {
        diff[i] += diff[i-1];
        arr[i] += diff[i];
    }

    // Print result
    for(int x : arr) cout << x << " ";
    cout << endl;

    return 0;
}
