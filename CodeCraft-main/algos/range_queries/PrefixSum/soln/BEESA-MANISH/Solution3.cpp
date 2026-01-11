/*
TC - O(N)

SC -O(N)

*/

// Submission LINK -https://codeforces.com/contest/1843/submission/355832183

#include <iostream>
#include <vector>
#include <numeric>
using namespace std;
bool check(int mid, int n, int m, const vector<pair<int, int>>& segments, const vector<int>& queries) {
    vector<int> a(n + 1, 0);
    for (int i = 0; i < mid; ++i) {
        a[queries[i]] = 1;
    }
    vector<int> pref(n + 1, 0);
    for (int i = 1; i <= n; ++i) {
        pref[i] = pref[i - 1] + a[i];
    }

    for (int i = 0; i < m; ++i) {
        int l = segments[i].first;
        int r = segments[i].second;
        int len = r - l + 1;
        int cnt1 = pref[r] - pref[l - 1];
        if (cnt1 * 2 > len) {
            return true;
        }
    }
    return false;
}

void solve() {
    int n, m;
    cin >> n >> m;
    vector<pair<int, int>> segments(m);
    for (int i = 0; i < m; ++i) {
        cin >> segments[i].first >> segments[i].second;
    }

    int q;
    cin >> q;
    vector<int> queries(q);
    for (int i = 0; i < q; ++i) {
        cin >> queries[i];
    }

    int low = 1, high = q, ans = -1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (check(mid, n, m, segments, queries)) {
            ans = mid;
            high = mid - 1; 
        } else {
            low = mid + 1;  
        }
    }

    cout << ans << "\n";
}

int main() {
    int t;
    cin >> t;
    while (t--) {
        solve();
    }
    return 0;
}