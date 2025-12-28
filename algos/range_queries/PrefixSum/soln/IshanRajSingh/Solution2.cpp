#include <bits/stdc++.h>
using namespace std;

#define int long long

/*
PROBLEM - The output to return is nothing but the prefix sum array itself
*/

/*
APPROACH
- Precompte prefix sum
*/

/*
TIME COMPLEXITY - O(N) where Q is no of queries
SPACE COMPLEXITY - O(N) For the prefix array
*/

/*
 -- IO --
 Input
1
4
1 2 3 4
Output
1 3 6 10
*/

signed main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        vector<int> v(n);
        for (int i = 0; i < n; i++) {
            cin >> v[i];
        }
        vector<int> pref(n);
        pref[0] = v[0];
        for (int i = 1; i < n; i++) {
            pref[i] = pref[i-1] + v[i]; 
        }

        for (int i = 0; i < n; i++) {
            cout << pref[i] << " ";
        }
        cout <<  '\n';
    }
}
