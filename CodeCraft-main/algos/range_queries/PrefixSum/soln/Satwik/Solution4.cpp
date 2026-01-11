/*
problem statement:
Find the minimum change number after which at least one of the segments will be beautiful, or −1
if none of the segments will be beautiful.

Approach (binary search + prefix sums):

Binary search on k in [1, q]. 
For a given k, mark the first k updated positions as 1.
Build prefix sums of ones.
checking conditions on ones,l and r, if ones * 2 > (r - l + 1), the condition holds.
The minimum k is the answer.

Complexity:
Time : O((n+m)log q) , function(feasible) + Binary Searching
Space: O(n + m).
*/

#include <bits/stdc++.h>
using namespace std;
#define ll long long
#define vll vector<ll>
#define out(x) cout << (x) << endl
#define outr(x)            \
    {                      \
        cout << x << endl; \
        return;            \
    }

bool feasible(ll k, ll n, vll &upd, vll &L, vll &R)
{
    vll mark(n + 1, 0), pref(n + 1, 0);
    for (ll i = 0; i < k; ++i)
    {
        mark[upd[i]] = 1;
    }
    for (ll i = 1; i <= n; ++i)
    {
        pref[i] = pref[i - 1] + mark[i];
    }

    for (ll i = 0; i < L.size(); ++i)
    {
        ll l = L[i], r = R[i];
        ll ones = pref[r] - pref[l - 1];
        if (ones * 2 > r - l + 1)
            return true;
    }
    return false;
}

void solve()
{
    ll n, m;
    cin >> n >> m;
    vll L(m), R(m);
    for (ll i = 0; i < m; ++i)
    {
        cin >> L[i] >> R[i];
    }

    ll q;
    cin >> q;
    vll upd(q);
    for (ll i = 0; i < q; ++i)
        cin >> upd[i];

    ll low = 1, high = q, ans = -1;
    while (low <= high)
    {
        ll mid = (low + high) / 2;
        if (feasible(mid, n, upd, L, R))
        {
            ans = mid;
            high = mid - 1;
        }
        else
        {
            low = mid + 1;
        }
    }
    out(ans);
}

int main()
{
    ll t;
    cin >> t;
    while (t--)
    {
        solve();
    }
    return 0;
}

//submission link: https://codeforces.com/problemset/submission/1843/355807262