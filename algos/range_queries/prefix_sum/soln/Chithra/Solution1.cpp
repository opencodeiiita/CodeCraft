#include <bits/stdc++.h>
using namespace std;

/*
Problem: B. Reverse Sort

Submission Link - https://codeforces.com/problemset/submission/1605/360853363

Approach:
- Let t be the sorted version of s.
- Collect indices where s[i] != t[i].
- If empty, print 0.
- Otherwise, print 1 operation with those indices.
- This subsequence is guaranteed to be non-increasing.

Time Complexity: O(n)
Space Complexity: O(n)
*/

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        string s;
        cin >> s;

        string sorted = s;
        sort(sorted.begin(), sorted.end());

        vector<int> idx;
        for (int i = 0; i < n; i++) {
            if (s[i] != sorted[i]) {
                idx.push_back(i + 1); 
            }
        }

        if (idx.empty()) {
            cout << 0 << "\n";
        } else {
            cout << 1 << "\n";
            cout << idx.size() << " ";
            for (int x : idx) cout << x << " ";
            cout << "\n";
        }
    }
    return 0;
}
