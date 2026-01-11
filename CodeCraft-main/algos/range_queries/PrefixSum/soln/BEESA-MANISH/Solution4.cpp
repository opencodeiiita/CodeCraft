/*

Time: O((n+m) log q)
Space: O(n)


*/

// Submission LINK - https://codeforces.com/contest/1605/submission/355832296

#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;
void solve() {
    int n;
    cin >> n;
    string s;
    cin >> s;
    if (is_sorted(s.begin(), s.end())) {
        cout << 0 << endl;
        return;
    }
    int zero_count = 0;
    for (char c : s) {
        if (c == '0') zero_count++;
    }
    vector<int> indices;
    for (int i = 0; i < zero_count; ++i) {
        if (s[i] == '1') {
            indices.push_back(i + 1); 
        }
    }
    for (int i = zero_count; i < n; ++i) {
        if (s[i] == '0') {
            indices.push_back(i + 1);
        }
    }
    cout << 1 << endl;
    cout << indices.size();
    for (int idx : indices) {
        cout << " " << idx;
    }
    cout << endl;
}

int main() {
    int t;
    cin >> t;
    while (t--) {
        solve();
    }
    return 0;
}