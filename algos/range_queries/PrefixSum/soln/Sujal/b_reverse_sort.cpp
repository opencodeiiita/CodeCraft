//PROBLEM STATEMENT- https://codeforces.com/problemset/problem/1605/B

//SUBMISSION LINK- https://codeforces.com/problemset/submission/1605/356028420

//APPROACH- For every gap, check the ones on left and zeroes on right using prefix and suffix sums
//          if at any point, they are equal(and non zero), they can be swapped
//TIME COMPLEXITY- O(n*n)
//SPACE COMPLEXITY- O(n*n)




#include<bits/stdc++.h>
using namespace std;

void solve(){
    int n;cin>>n;
    string s;cin>>s;
    if(n==1){cout<<0<<"\n";return;}

    vector<vector<int>> L(n-1),R(n-1);

    if(s[0]=='1')L[0].push_back(0);
    for(int i=1;i<n-1;i++){
        L[i]=L[i-1];
        if(s[i]=='1')L[i].push_back(i);
    }

    if(s[n-1]=='0')R[n-2].push_back(n-1);
    for(int i=n-2;i>0;i--){
        R[i-1]=R[i];
        if(s[i]=='0')R[i-1].push_back(i);
    }

    for(int i=0;i<n-1;i++){
        int a=L[i].size(),b=R[i].size();
        if(a==b&&a){
            cout<<1<<"\n"<<a+b<<" ";
            for(int x:L[i])cout<<x+1<<" ";
            for(auto it=R[i].rbegin();it!=R[i].rend();it++)cout<<*it+1<<" ";
            cout<<"\n";
            return;
        }
    }
    cout<<0<<"\n";
}

int main(){
    int t;cin>>t;
    while(t--)solve();
}
