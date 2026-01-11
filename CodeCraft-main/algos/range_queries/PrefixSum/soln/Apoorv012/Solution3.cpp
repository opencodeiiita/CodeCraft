/*

Ashish has a binary string s of length n that he wants to sort in non-decreasing order.
Choose a subsequence of any length such that its elements are in non-increasing order.
Reverse this subsequence in-place.

Time: O(n)
Space: O(n)

Link: https://codeforces.com/contest/1605/submission/355290481

*/

#include <bits/stdc++.h>
using namespace std;

using ll = long long;
const ll MOD = 998244353;

void solve() {
    int n;
    cin >> n;
    string s;
    cin >> s;

    // cout << "n, s: " << n << " " << s << endl;

    int st = 0, en = n-1;
    vector<int> ones, zeroes;
    while (st < en) {
        // cout << st << " -=- " << en << endl;
        bool oneFound = false, zeroFound = false;
        while (st < n && s[st] == '0') {
            st++;
        }
        if (st < n) oneFound = true;
        // cout << "found one at " << st << endl;
        while (en >= 0 && s[en] == '1') {
            en--;
        }
        if (en >= 0) zeroFound = true;
        // cout << "found zero at " << en << endl;
        // cout << oneFound << " " << zeroFound << endl;
        if (oneFound && zeroFound) {
            // cout << "meow\n";
            if (st < en) {
                // cout << "yes\n";
                ones.push_back(st++ + 1);
                zeroes.push_back(en-- + 1);
                continue;
            }
            else break;
        }
        else {
            break;
        }
    }

    if (!ones.size()) {
        cout << 0 << endl;
        return;
    }

    reverse(zeroes.begin(), zeroes.end());

    cout << 1 << endl;
    cout << (2 * ones.size()) << " ";
    for (auto el: ones) cout << el << " ";
    for (auto el: zeroes) cout << el << " ";

    cout << endl;

}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    int t = 1;
    cin >> t;
    
    while (t--) {
        solve();
    }
    
    return 0;
}