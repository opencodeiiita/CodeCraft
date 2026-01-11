/*
Short problem statement:
Given a binary string s, in one operation you may choose any subsequence that is non-increasing (all 1s then 0s) and reverse it. Find the minimum number of operations to sort s in non-decreasing order and output the operations.

Approach:
Use l and r to collect unsorted positions
any left 1 move to right and any right 0 move to left.
reversing it once fixes all inversions.

Complexity:
Time: O(n)
Space: O(n) for storing the indices.
*/

#include <bits/stdc++.h>
using namespace std;
#define ll long long
#define vll vector<ll>
#define out(x) cout << (x) << endl
#define outr(x)            \
    {                      \
        cout << x << endl; \
        return;            \
    }

void solve()
{
    ll n;
    cin >> n;
    string s;
    cin >> s;

    vll pos;
    ll l = 0, r = n - 1;

    while (l < r)
    {
        while (l < r && s[l] == '0')
            l++;
        while (l < r && s[r] == '1')
            r--;
        if (l < r)
        {
            pos.push_back(l + 1);
            pos.push_back(r + 1);
            l++;
            r--;
        }
    }

    if (!pos.empty() && l == r && s[l] == '0')
    {
        bool is1 = false;
        for (ll i = l + 1; i < n; ++i)
        {
            if (s[i] == '1')
            {
                is1 = true;
                break;
            }
        }
        if (!is1)
            pos.push_back(l + 1);
    }

    if (pos.empty())
    {
        outr(0);
    }

    sort(pos.begin(), pos.end());
    out(1);
    cout << pos.size() << " ";
    for (ll i = 0; i < pos.size(); ++i)
    {
        if (i + 1 == pos.size())
            out(pos[i]);
        else
            cout << pos[i] << ' ';
    }
}

int main()
{
    ll t;
    cin >> t;
    while (t--)
    {
        solve();
    }
}

// submission link: https://codeforces.com/problemset/submission/1605/355743391