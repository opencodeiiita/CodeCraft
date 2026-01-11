//#include <bits/stdc++.h>
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <map>
#include <set>
#include <unordered_map>
#include <queue>
#include <stack>
#include <cmath>
#include <climits>
#define int long long
#define fo(n) for (int i = 0; i < n; i++)
#define fo1(ii, n) for(int i=ii; i<n; i++)
#define all(x) x.begin(), x.end()
#define rall(x) x.rbegin(), x.rend()
#define pb push_back
#define fi first
#define se second
#define vec(a) vector<int> a
#define vecn(a,n) vector<int> a(n)
#define py cout<<"YES"<<endl
#define pn cout<<"NO"<<endl
const int MOD = 1e9 + 7;
const int INF = 1e18;
using namespace std;

void solve(){
    int n,k;
    cin>>n>>k;
    vector<int>arr(n);
    fo(n)cin>>arr[i];
    while(k){
        int a;
        cin>>a;
        if(a!=1){
            int b;
            cin>>b;
            cout<<arr[b-1]<<endl;
        }
        else{
            int b,c,d;
            cin>>b>>c>>d;
            for(int i=b-1;i<c;i++){
                arr[i]+=d;
            }
        }
        k--;
    }
}

signed main() {
    ios_base::sync_with_stdio(false);
    cin.tie(0);
    solve();
    return 0;
}