/*
Problem Statement:
Given an array initially filled with zeros,
perform multiple range update operations.
Each operation adds a value X to all elements
in the range [L, R]. After all updates,
print the final array.

Approach (Difference Array + Prefix Sum):
We use a difference array to apply each range update
in O(1) time. After processing all queries,
we compute the prefix sum of the difference array
to get the final updated array.

Time Complexity:
Processing updates: O(Q)
Final prefix sum: O(N)

Space Complexity:
O(N)

Example:
Input:
5
2
0 2 10
1 3 5

Output:
10 15 15 5 0
*/

#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;

    vector<int> diff(n + 1, 0);

    int q;
    cin >> q;

    while(q--) {
        int l, r, x;
        cin >> l >> r >> x;

        diff[l] += x;
        if(r + 1 < n)
            diff[r + 1] -= x;
    }

    vector<int> arr(n, 0);
    arr[0] = diff[0];

    for(int i = 1; i < n; i++) {
        arr[i] = arr[i - 1] + diff[i];
    }

    for(int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }

    return 0;
}
