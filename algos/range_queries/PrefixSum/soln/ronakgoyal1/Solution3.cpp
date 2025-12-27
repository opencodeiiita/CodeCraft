/*
Problem Statement:
Given a binary array (containing only 0 and 1),
answer queries asking for the count of 1s in a given range.

Approach (Prefix Sum):
We build a prefix array where prefix[i] stores
the number of 1s from index 0 to i.
Each query is answered in O(1) time.

Time Complexity:
Preprocessing: O(N)
Each query: O(1)

Space Complexity:
O(N)

Example:
Input:
5
1 0 1 1 0
Query: 1 3

Output:
2
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

    vector<int> prefix(n, 0);
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
