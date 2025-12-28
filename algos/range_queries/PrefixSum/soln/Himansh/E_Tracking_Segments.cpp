//PROBLEM STATEMENT- https://codeforces.com/problemset/problem/1843/E
//SUBMISSION LINK- https://codeforces.com/problemset/submission/1843/355308893
//APPROACH- Standard binary search on queries as they are monotonues (F F F T T TT)
//TIME COMPLEXITY- O(nlogn)
//SPACE COMPLEXITY- O(n)



#include <bits/stdc++.h>
using namespace std;


bool check(vector <pair<int,int>> &range,vector <int> &queries,int mid,int n){
    vector<int> a(n,0);
    int count=0;
    for(auto q:queries){
        count++;
        a[q-1]=1;
        if(count==mid)break;
    }
    vector <int> prefix(n+1);
    prefix[0]=0;
    for(int i=0;i<n;i++){
        prefix[i+1]=prefix[i]+a[i];
    }

    for(auto p:range){
        if((prefix[p.second]-prefix[p.first-1])>(p.second-p.first+1)/2){
            return true;
        }
    }
    return false;
}

void solve(){
    int n,m;
    cin>>n>>m;
    vector <pair<int,int>> range;
    for (int i = 0; i < m; i++)
    {
        int x,y;
        cin>>x>>y;
        range.push_back({x,y});
    }
    
    int q;
    cin>>q;
    vector <int>queries(q);
    for(int i=0;i<q;i++){
        cin>>queries[i];
    }

    int high= q;
    int low=1;
    int mid;
    bool possible=0;
    while (high-low>=0)
    {
        mid=(high+low)/2;
    
    if(check(range,queries,mid,n)){
        high=mid-1;
        possible=1;
    }    else{
        low=mid+1;
    }
}
if(possible)cout<<low<<endl;
else cout<<-1<<endl;

}

signed main(){
    int t;
    cin>>t;
    while (t--)
    {  
       solve();
    }
    
}
