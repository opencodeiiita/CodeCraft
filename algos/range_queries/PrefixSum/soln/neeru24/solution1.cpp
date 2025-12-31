/*
Problem Statement:
Given an array of integers and multiple queries, each query asks for the
sum of elements in the range [L, R] (0-based indexing).

Approach (Prefix Sum):
We build a prefix sum array where prefix[i] stores the sum of elements
from index 0 to i.
The sum of range [L, R] is:
prefix[R] - prefix[L-1] (if L > 0), else prefix[R].

Time Complexity:
O(n) preprocessing + O(1) per query

Space Complexity:
O(n)

Example:
Input:
5
1 2 3 4 5
3
0 2
1 3
2 4

Output:
6
9
12
*/

#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;

    vector<int> arr(n), prefix(n);
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }

    prefix[0] = arr[0];
    for (int i = 1; i < n; i++) {
        prefix[i] = prefix[i - 1] + arr[i];
    }

    int q;
    cin >> q;
    while (q--) {
        int l, r;
        cin >> l >> r;
        int sum = prefix[r] - (l > 0 ? prefix[l - 1] : 0);
        cout << sum << "\n";
    }

    return 0;
}
