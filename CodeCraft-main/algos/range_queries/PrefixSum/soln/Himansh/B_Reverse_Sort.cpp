//PROBLEM STATEMENT- https://codeforces.com/problemset/problem/1605/B
//SUBMISSION LINK- https://codeforces.com/problemset/submission/1605/355304291
//APPROACH- For every gap, check the ones on left and zeroes on right using prefix and suffix sums
//          if at any point, they are equal(and non zero), they can be swapped
//TIME COMPLEXITY- O(n*n)
//SPACE COMPLEXITY- O(n*n)

#include <bits/stdc++.h>
using namespace std;

void solve(){
    int n;
    cin>>n;
    string s;
    cin>>s;
    if(n==1){
        cout<<0<<endl;
        return;
    }
    vector <vector<int>> OneLeft(n-1);
    OneLeft[0]={};
    if(s[0]=='1')OneLeft[0].push_back(0);

    for(int i=1;i<n-1;i++){
        OneLeft[i]=OneLeft[i-1];
        if(s[i]=='1'){
            OneLeft[i].push_back(i);
        }
    }
    vector <vector<int>> ZeroRight(n-1);
    ZeroRight[n-2]={};
    if(s[n-1]=='0')ZeroRight[n-2].push_back(n-1);
    for(int i=n-2;i>0;i--){
        ZeroRight[i-1]=ZeroRight[i];
        if(s[i]=='0'){
            ZeroRight[i-1].push_back(i);
        }
    }

    for(int i =0; i<n-1;i++){
        int o=OneLeft[i].size();
        int m=ZeroRight[i].size();
        if(m==o&&o!=0){
            cout<<1<<endl;
            cout<<m+o<<" ";
            for(auto j:OneLeft[i]){
                cout<<j+1<<" ";
            }
            for (auto it = ZeroRight[i].rbegin(); it != ZeroRight[i].rend(); ++it) {
                cout << *it + 1 << " ";
            }

            cout<<endl;
            return;
        }
    }
    cout<<0<<endl;

}

signed main(){
    int t;
    cin>>t;
    while (t--)
    {  
       solve();
    }
    
}
