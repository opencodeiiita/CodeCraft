#include<bits/stdc++.h>
#include<queue>
using namespace std;
typedef unordered_map<int, int> umii;
typedef unordered_map<long long, long long> umll;
typedef unordered_map<char, long long> umci;
typedef vector<pair<int, int>> vpi;
typedef vector<int> vi;
typedef long long ll;
typedef vector<long long> vll;
typedef unordered_map<int , bool> umib;
#define sum(v) accumulate(v.begin(), v.end(), 0)
#define endl '\n'
#define f0(i, n) for(long long i = 0; i < n; i++)
#define f1(i, n) for(long long i = 1; i < n; i++)
#define as(v) sort(v.begin(), v.end())
#define all(x) (x).begin(), (x).end()
#define pb push_back
template<class T> umll frequency(vector<T> &v) {umll freq;for(auto &x:v) freq[x]++; return freq;}
template<class T> umci S_frequency(vector<T> &v) {umci freq;for(auto &x:v) freq[x]++; return freq;}
template <class T> void input(vector<T> &v){for(auto &x:v)cin>>x;}
ll power(ll x, ll y){ ll res = 1; while (y > 0){ if (y & 1) res = (ll)(res*x); y = y>>1; x = (ll)(x*x); } return res; }
void pvll(const vector<long long> &arr){for(auto it : arr){cout << it << " ";}cout << endl;}
void pvi(const vector<int> &arr){for(auto it : arr){cout << it << " ";}cout << endl;}

// TIME COMPLEXITY o(n)
// Space Complexity o(n)
void solve(){

//-------------INPUT-------------
    ll n; 
    cin >> n;
    string s;
    cin >> s;
    ll idxzero=0,idxone=0;
    for(ll i=n-1;i>=0;i--)
    {
        if(s[i]=='0')
        {
            idxzero=i;
            break;
        }
    }
    for(ll i=0;i<n;i++)
    {
        if(s[i] == '1')
        {
            idxone=i;
            break;
        }
    }
    // i got the first 0 from last and first 1 from beginning 
    vll ans;
    while(idxone < idxzero && idxone < n && idxzero >=0)
    {
        if(s[idxzero]=='0' && s[idxone]=='1')
        {
            ans.push_back(idxone+1);
            ans.push_back(idxzero+1);   
            idxone++;
            idxzero--;
        }
        while(s[idxone]=='0' && idxone < n)
        {
            idxone++;
        }
        while(s[idxzero]=='1' && idxzero >=0)
        {
            idxzero--;
        }
    }
    // collected all zeros and ones which are not in position
    sort(all(ans));
    if(ans.size()==0)
    {
        cout << 0 << endl;
        return;
    }
    cout << 1 << endl;
    cout << ans.size() << " ";
    f0(i,ans.size())
    {
        cout << ans[i] << " ";
    }
    // ans will always be 1 over here
    cout << endl;

    // submission link:- https://codeforces.com/contest/1605/submission/342433265

    

//-------------CODE--------------
    


}


int main(){
    int tt; cin >> tt; while(tt--)
{solve();};
}