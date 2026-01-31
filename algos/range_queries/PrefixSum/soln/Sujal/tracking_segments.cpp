//PROBLEM STATEMENT- https://codeforces.com/problemset/problem/1843/E

//SUBMISSION LINK- https://codeforces.com/problemset/submission/1843/356028549


//APPROACH- Standard binary search on queries as they are monotonues (F F F T T TT)
//TIME COMPLEXITY- O(nlogn)
//SPACE COMPLEXITY- O(n)




#include<bits/stdc++.h>
using namespace std;

bool ok(vector<pair<int,int>>&seg,vector<int>&q,int mid,int n){
    vector<int>a(n,0);
    for(int i=0;i<mid;i++)a[q[i]-1]=1;

    vector<int>pre(n+1,0);
    for(int i=0;i<n;i++)pre[i+1]=pre[i]+a[i];

    for(auto &p:seg){
        if(pre[p.second]-pre[p.first-1]>(p.second-p.first+1)/2)
            return true;
    }
    return false;
}

void solve(){
    int n,m;cin>>n>>m;
    vector<pair<int,int>>seg(m);
    for(int i=0;i<m;i++)cin>>seg[i].first>>seg[i].second;

    int qn;cin>>qn;
    vector<int>q(qn);
    for(int i=0;i<qn;i++)cin>>q[i];

    int l=1,r=qn,ans=-1;
    while(l<=r){
        int mid=(l+r)/2;
        if(ok(seg,q,mid,n)){
            ans=mid;
            r=mid-1;
        }else l=mid+1;
    }
    cout<<ans<<"\n";
}

int main(){
    int t;cin>>t;
    while(t--)solve();
}
