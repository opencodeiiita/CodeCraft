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


// checking each query monotically will be helping so binary search + prefix sum question 

// submission link :-https://codeforces.com/contest/1843/submission/355631357


void solve(){

//-------------INPUT-------------
    ll n; 
    cin >> n;
    ll m;
    cin >> m;
    vector<pair<ll,ll>>a;
    for(ll i=0;i<m;i++)
    {
        ll p;
        ll q;
        cin >> p >> q;
        a.push_back({p,q});
    }
    ll q;
    cin >> q;
    vll queries;
    for(ll i=0;i<q;i++)
    {
        ll m;
        cin >> m;
        queries.push_back(m);
    }
    
    //-------------CODE--------------
    // applying binary search on queries
    
    ll low =0;
    ll high = q-1;
    ll ans=-1;
    
    while(high>=low)
    {
        vll v(n,0);
        ll mid = low + (high-low)/2;
        // modifying og v
        for(ll i=0;i<=mid;i++)
        {

            v[queries[i]-1]=1;
        }
        // making a prefix sum :)

        vll pf(n);
        pf[0] = v[0];
        for(ll i=1;i<n;i++)
        {
            pf[i] = pf[i-1] + v[i];
        }
        // pf is ready now check queries
        bool flag = false;

        for(auto i : a)
        {
            ll one=0;
            ll zero=0;
            i.first--;
            i.second--;
            if(i.first!=0)
            {
                one = pf[i.second] - pf[i.first-1];
            }
            else
            {
                one  = pf[i.second];
            }
            zero = i.second-i.first+1 - one;
            if(one>zero)
            {
                flag=true;
            }
            if(flag==true)
            {
                break;
            }
        }

        if(flag==true)
        {
            // i will revert change and try on smaller queries

            v[mid] = 0;
            ans = mid+1;
            high = mid-1;
        }
        else
        {
            v[mid] = 0;
            low = mid+1;
        }

    }
    cout << ans << endl;


}

//time complexity is O(n+m)logn


int main(){
    int tt; cin >> tt; while(tt--)
{solve();};
}