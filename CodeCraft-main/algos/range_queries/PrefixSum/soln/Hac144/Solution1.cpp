/*
Problem: Answer multiple range sum queries efficiently.

Approach:
- Build prefix sum array: prefix[i] = sum of arr[0..i].
- Query sum(l,r) = prefix[r] - (l > 0 ? prefix[l-1] : 0).

Time Complexity: O(n + q)
Space Complexity: O(n)
*/
#include <iostream>
#include <vector>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    vector<int> prefix(n);
    prefix[0] = arr[0];
    for (int i = 1; i < n; i++) {
        prefix[i] = prefix[i-1] + arr[i];
    }
    int q;
    cin >> q;
    while (q--) {
        int l, r;
        cin >> l >> r; 
        int sum = prefix[r] - (l > 0 ? prefix[l-1] : 0);
        cout << sum << "\n";
    }

    return 0;
}
