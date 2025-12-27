/*
Problem Statement:
Given an array and multiple range queries,
find the sum of even and odd elements separately for each range.

Approach (Prefix Sum):
We maintain two prefix arrays:
1) evenPrefix[i]: sum of even numbers from index 0 to i
2) oddPrefix[i]: sum of odd numbers from index 0 to i

This allows answering each query in O(1) time.

Time Complexity:
Preprocessing: O(N)
Each query: O(1)

Space Complexity:
O(N)

Example:
Input:
5
1 2 3 4 5
Query: 1 3

Output:
Even Sum = 6, Odd Sum = 3
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

    vector<int> evenPrefix(n, 0), oddPrefix(n, 0);

    if(arr[0] % 2 == 0)
        evenPrefix[0] = arr[0];
    else
        oddPrefix[0] = arr[0];

    for(int i = 1; i < n; i++) {
        evenPrefix[i] = evenPrefix[i - 1];
        oddPrefix[i]  = oddPrefix[i - 1];

        if(arr[i] % 2 == 0)
            evenPrefix[i] += arr[i];
        else
            oddPrefix[i] += arr[i];
    }

    int q;
    cin >> q;

    while(q--) {
        int l, r;
        cin >> l >> r;

        int evenSum, oddSum;

        if(l == 0) {
            evenSum = evenPrefix[r];
            oddSum  = oddPrefix[r];
        } else {
            evenSum = evenPrefix[r] - evenPrefix[l - 1];
            oddSum  = oddPrefix[r]  - oddPrefix[l - 1];
        }

        cout << "Even Sum = " << evenSum
             << ", Odd Sum = " << oddSum << endl;
    }

    return 0;
}
