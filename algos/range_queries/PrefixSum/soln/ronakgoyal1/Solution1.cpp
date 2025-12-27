/*
Problem Statement:
Given an array of integers and multiple range queries,
each query asks for the sum of elements between indices L and R (inclusive).

Approach (Prefix Sum):
We build a prefix sum array where prefix[i] stores the sum of elements
from index 0 to i.
Then each range sum query can be answered in O(1) time using:
sum(L, R) = prefix[R] - prefix[L-1]

Time Complexity:
- Preprocessing: O(N)
- Each query: O(1)

Space Complexity:
O(N) for prefix sum array

Example:
Input:
Array = [1, 2, 3, 4, 5]
Query: L = 1, R = 3

Output:
9
*/

#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;

    vector<int> arr(n);
    for(int i = 0; i < n; i++) {
        cin >> arr[i];
    }

    vector<int> prefix(n);
    prefix[0] = arr[0];

    for(int i = 1; i < n; i++) {
        prefix[i] = prefix[i - 1] + arr[i];
    }

    int q;
    cin >> q;

    while(q--) {
        int l, r;
        cin >> l >> r;

        if(l == 0)
            cout << prefix[r] << endl;
        else
            cout << prefix[r] - prefix[l - 1] << endl;
    }

    return 0;
}
