#include <bits/stdc++.h>
using namespace std;
#define int long long
#define INF (int)1e18
#define MOD 1000000007
#define MOD1 998244353

mt19937_64 RNG(chrono::steady_clock::now().time_since_epoch().count());
/*
problem statement :- in this problem we have to tell sum till index i from index 0

solution :- make a sum = 0, add the array[i] in sum and print it and move
time complexity would be O(n) and space complexity would be O(1)
*/
void Solve()
{
    int n; cin >> n;
    vector<int> a(n);
    for (auto &it : a) cin >> it;

    int sum = 0; // this will just maintain running sum
    for (int i = 0; i < n; i++) {
        sum += a[i];
        cout << sum << ' ';
    }
    cout << '\n';
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