#include <bits/stdc++.h>
using namespace std;

#define int long long

/*
PROBLEM - To find the sum of subarray from l to r
*/

/*
APPROACH
- Precompte prefix sum, use it to ans the queries in O(1)
*/

/*
TIME COMPLEXITY - O(N + Q) where Q is no of queries
SPACE COMPLEXITY - O(N) For the prefix array
*/

/*
 -- IO --
 Input
1
4 3
1 3 5 7
0 3
0 1
0 0
Output
16
4 
1
*/

signed main() {
    int t;
    cin >> t;
    while (t--) {
        int n, q;
        cin >> n >> q;
        vector<int> v(n);
        for (int i = 0; i < n; i++) {
            cin >> v[i];
        }
        vector<int> pref(n+1);
        for (int i = 1; i <= n; i++) {
            pref[i] = pref[i-1] + v[i-1];
        }
        while (q--) {
            // 0 based indexing as given in leetcode
            int l, r;
            cin >> l >> r;
            int ans = pref[r+1] - pref[l];
            cout << ans << '\n';
        }
    }
}
