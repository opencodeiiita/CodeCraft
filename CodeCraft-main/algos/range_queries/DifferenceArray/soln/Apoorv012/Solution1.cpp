/*
Given an array of n integers, your task is to process q queries of the following types:
- increase each value in range [a,b] by u
- what is the value at position k?

Time: O((n+q) log n)
Space: O(n)

Submission Link: https://cses.fi/problemset/result/15762907/
*/

#include <bits/stdc++.h>
using namespace std;

using ll = long long;
const ll MOD = 998244353;

class Fenwick {
    vector<ll> v;
    ll n;

public:
    Fenwick(ll _n) {
        n = _n;
        v.assign(n+1, 0);
    }

    void update(ll i, ll k) {
        for (; i <= n; i += (i & -i)) {
            v[i] += k;
        }
    }
    ll sum(ll i) {
        ll ans = 0;
        for (; i > 0; i -= (i & -i)) {
            ans += v[i];
        }
        return ans;
    }
};

void solve() {
    ll n, q;
    cin >> n >> q;
    // cout << "n, q: " << n << " " << q << endl;

    vector<ll> x(n+1, 0);
    for (ll i = 1; i <= n; i++) {
        cin >> x[i];
    }

    // cout << "got the vectors\n";

    vector<ll> diff(n+1, 0);
    for (ll i = 1; i <= n; i++) {
        diff[i] = x[i] - x[i-1];
    }

    Fenwick fenwick(n);    
    for (ll i = 1; i <= n; i++) {
        fenwick.update(i, diff[i]);
    }

    while (q--) {
        // cout << q << endl;
        ll t;
        cin >> t;
        if (t == 1) {
            // cout << "query 1 started\n";
            ll a, b, u;
            cin >> a >> b >> u;

            // cout << "Update the sum from [" << a << ", " << b << "] by " << u << endl;
            fenwick.update(a, u);
            if (b + 1 <= n)
                fenwick.update(b + 1, -u);
            // cout << "query 1 completed\n";
        }
        else {
            // cout << "query 2: ";
            ll k;
            cin >> k;
            // cout << "what is the value at " << k << endl;
            cout << fenwick.sum(k) << endl;
        }
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    int t = 1;
    // cin >> t;
    
    while (t--) {
        solve();
    }
    
    return 0;
}