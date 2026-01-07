//submission: https://cses.fi/paste/e4457766b0659c86f204fa/
/* Given an array of n integers, your task is to process q queries of the following types:
increase each value in range [a,b] by u ----1 a b u
what is the value at position k?        ---2 k               */



increase each value in range [a,b] by u
what is the value at position k?

#include <bits/stdc++.h>
using namespace std;

using ll = long long;
#define all(x) (x).begin(), (x).end()

const int MOD = 1e9 + 7;
//we use iterative segment tree so max size=2^18 = 262,144 < 2e5

/* The second half of the array sz to 2*sz-1 stores the leaves.
The first half 1 to sz-1 stores the internal sums.                 */
const int sz = 1<<18;
ll tree[sz*2];
void change(int i, int x){
    i+=sz;
    while(i){
        tree[i]+=x;
        i/=2;
    }
}

ll get_sum(int l,int r){
    ll res = 0;
    l += sz;
    r += sz;
    while (l <= r) {
        if (l % 2 == 1) res += tree[l++];
        if (r % 2 == 0) res += tree[r--];
        l /= 2;
        r /= 2;
    }
    return res;
}
//we will be using difference array here 
void solve() {
    int n,q;
    cin>>n>>q;
    vector<ll> a(n);
    for(int i=1;i<=n;i++){
        int x;
        cin>>x;
        change(i,x);
        change(i+1,-x);
    }
    while(q--){
        int t; cin>>t;
        if(t==1){
            int l,r,u;
            cin>>l>>r>>u;
          //making changes: increment [l,r] index values by u 
            change(l,u);
            change(r+1,-u);
        }
        else{
            int k; cin>>k;
            cout<<get_sum(1,k)<<endl;
        }
    }
}
//T.C.: O(NlogN + Q*logN)
//S.C.: O(sz)
int main() {
    // Fast I/O
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    solve();
    
    return 0;
}
