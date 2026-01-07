/*
Problem Statement:
Given an array of integers, efficiently answer multiple range sum queries.
Each query asks for the sum of elements between indices L and R (inclusive).
Approach:
We use a Prefix Sum array to answer range sum queries in O(1) time:
1. Construct a prefix sum array `prefix` of size n:
   - prefix[0] = arr[0]
   - prefix[i] = prefix[i-1] + arr[i] for i = 1 to n-1
2. For a query [L, R], the sum is:
   - If L == 0: sum = prefix[R]
   - Else: sum = prefix[R] - prefix[L-1]
Time Complexity:
- O(N) to build the prefix sum array
- O(1) per query
- Overall: O(N + Q), where Q = number of queries
Space Complexity:
- O(N) for the prefix sum array
Example:
Input: arr = [1,2,3,4,5], queries = [[1,3],[0,2]]
Output: [9,6]
Explanation:
- Query [1,3] sum = 2+3+4 = 9
- Query [0,2] sum = 1+2+3 = 6
*/

#include <bits/stdc++.h>
using namespace std;
int main() {
    int n = 5;
    vector<int> arr = {1, 2, 3, 4, 5};
    int queries[][2] = {{1, 3}, {0, 2}};
    int q = 2;
    vector<int> prefix(n);
    prefix[0] = arr[0];
    for(int i = 1; i < n; i++) {
        prefix[i] = prefix[i-1] + arr[i];
    }
    for(int i = 0; i < q; i++) {
        int L = queries[i][0];
        int R = queries[i][1];
        int sum = (L == 0) ? prefix[R] : prefix[R] - prefix[L-1];
        cout << sum << " ";
    }
    cout << endl;
    return 0;
}
