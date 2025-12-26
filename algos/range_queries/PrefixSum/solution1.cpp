 /*
 Problem:
 Given an integer array nums,answer multiple queries where each query asks
 for the sum of elements between indices left and right (inclusive)

 Approach:
 Create a prefix sum array where each index stores the sum of elements
 up to that position.The sum for any range [l, r] is calculated as
 prefix[r + 1] - prefix[l].

 Time Complexity:O(n+q);
 Space Complexity:O(n);
 */


#include<bits/stdc++.h>
using namespace std;
typedef long long ll;

#define MOD 1000000007LL
#define vin(a)                        \
 for (int i = 0; i < (a).size(); i++) \
		cin >> a[i];
#define vout(a)                     \
 for (int i = 0; i < a.size(); i++) \
		cout << a[i] << ' ';              \
 cout << endl;

 
ll binexp(ll a, ll b)
{
    a %= MOD;
    ll res = 1;
    while (b > 0)
    {
        if (b & 1)
            res = (res * a) % MOD;
        a = (a * a) % MOD;
        b >>= 1;
    }
    return res;
}   

#define int long long 
#define INT_MAX LLONG_MAX
#define INT_MIN LLONG_MIN
#define vi vector<ll>
#define pb push_back
#define ppb pop_back
#define minV(a) min_element(all(a))
#define maxV(a) max_element(all(a))


void solve() {
  int n;
  cin>>n;
  vi nums(n);
  vin(nums);
  vi prefix(n+1,0);
  for(int i=0;i<n;i++){
    prefix[i+1]=prefix[i]+nums[i];
  }

  int q;
  cin>>q;
  while(q--){
    int l,r;
    cin>>l>>r;
    int sum=prefix[r+1]-prefix[l];
    cout<<sum<<' ';
  }
  cout<<endl;
  
}


signed main(){

    solve();
    
    return 0;
}
