/*

You are given an array a consisting of n zeros. You are also given a set of m not necessarily different segments. Each segment is defined by two numbers li and ri (1≤li≤ri≤n) and represents a subarray ali,ali+1,…,ari of the array a.
You also have q changes. For each change you are given the number 1≤x≤n, which means that you must assign an element ax the value 1.
You have to find the first change after which at least one of m given segments becomes beautiful, or report that none of them is beautiful after processing all q changes.

Time: O((n+m) log q)
Space: O(n)

Link: https://codeforces.com/contest/1843/submission/355296312

*/

#include <bits/stdc++.h>
using namespace std;

using ll = long long;
const ll MOD = 998244353;

void solve() {
    int n, m;
    cin >> n >> m;
    vector<int> v(n, 0);
    vector<pair<int, int>> segments(m);
    for (int i = 0; i < m; i++) {
        cin >> segments[i].first >> segments[i].second;
        segments[i].first--;
    }
    int q;
    cin >> q;
    vector<int> changes(q);
    for (int i = 0; i < q; i++) {
        cin >> changes[i];
        changes[i]--;
    }

    int left = 0, right = q+1;
    while (left < right) {
        // cout << left << " " << right << endl;
        int mid = (left + right) / 2;
        vector<int> curr(n, 0);
        for (int i = 0; i < mid; i++) {
            // cout << "-" << changes[i] << endl;
            curr[changes[i]] = 1;
        }

        vector<int> prefix(n+1, 0);
        prefix[0] = 0;
        for (int i = 1; i <= n; i++) {
            prefix[i] = prefix[i-1] + curr[i-1];
        }
        int works = false;
        for (int i = 0; i < m; i++) {
            int start = segments[i].first, stop = segments[i].second;
            int sum = prefix[stop] - prefix[start];
            int len = stop - start;
            if (sum > (len/2)) {
                works = true;
                break;
            }
        }
        if (works) {
            right = mid;
        }
        else {
            left = mid + 1;
        }
    }
    // cout << "ANSWER: ";
    if (right == q+1) {
        cout << -1 << endl;
    }
    else {
        cout << right << endl;
    }

}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    int t = 1;
    cin >> t;
    
    while (t--) {
        solve();
    }
    
    return 0;
}