#include <bits/stdc++.h>
using namespace std;
#define int long long
#define INF (int)1e18
#define MOD 1000000007
#define MOD1 998244353

mt19937_64 RNG(chrono::steady_clock::now().time_since_epoch().count());

/*
problem statement :- You have given some array a and also you have given multiple
queries q
in each query you have given indices l, r and you have to tell sum of the elements
in this range

naive approach time complexity will be O(n*q) where we can just iterate every time
on given range and tell the sum

but better approach will be to precompute the sum in prefix sum array and then
for each query we can answer the range in O(1) 
therefore time complexity will be O(n + q)

idea is to get sum of range l, r, since we will be knowing sum till r, if we 
subtract the sum from l-1 index then we will get sum in range l to r
*/

void Solve()
{
    int n, q; cin >> n >> q; 
    vector<int> a(n);
    for (auto &it : a) cin >> it; // array input
    vector<int> pf(n+1);
    for (int i = 1; i <= n; i++) pf[i] = pf[i-1] + a[i-1];

    while (q--) {
        int l, r; cin >> l >> r;
        cout << pf[r] - pf[l-1] << '\n';
    }
}

int32_t main() 
{
    /*Jai Shree Krishna*/
    ios_base::sync_with_stdio(0);
    cin.tie(0);
    int t = 1;
    // freopen("in",  "r", stdin);
    // freopen("out", "w", stdout);
    
    cin >> t;
    for(int i = 1; i <= t; i++) 
    {
        //cout << "Case #" << i << ": ";
        Solve();
    }
}