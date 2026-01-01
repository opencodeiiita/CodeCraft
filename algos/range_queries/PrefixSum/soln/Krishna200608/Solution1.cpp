/*
====================================================
Problem: Reverse Sort (Codeforces 1605B)
====================================================

-------------------------
Short Problem Statement
-------------------------
You are given a binary string of length n.
In one operation, you may choose any subsequence of indices
and reverse the characters at those positions.
Determine whether the string can be sorted so that all 0s
come before all 1s. If possible, output the indices used
in at most one operation.

-------------------------
Approach (Prefix Sums + Difference Logic)
-------------------------
1. In a sorted binary string:
   - All '0's appear first, then all '1's.
2. Let cnt0 be the total number of '0's in the string.
   - Indices [0 ... cnt0-1] must be '0'
   - Indices [cnt0 ... n-1] must be '1'
3. Build prefix sums:
   - pref0[i] = number of '0's in s[0 ... i-1]
   - pref1[i] = number of '1's in s[0 ... i-1]
4. Using cnt0, check each position:
   - If s[i] != expected character, mark index (i+1)
5. If no mismatches exist → already sorted.
6. Otherwise, reversing all mismatched indices in ONE
   operation always fixes the string.

-------------------------
Time & Space Complexity
-------------------------
Time Complexity:  O(n) per test case
Space Complexity: O(n)

-------------------------
Example (Optional)
-------------------------
Input:
1
5
11001

Output:
1
4 1 2 4 5

-------------------------
Clean, Compiling C++ Code
-------------------------
*/

#include <bits/stdc++.h>
using namespace std;

void solve() {
    int n;
    cin >> n;
    string s;
    cin >> s;

    // Prefix sums
    vector<int> pref0(n + 1, 0), pref1(n + 1, 0);
    for (int i = 0; i < n; i++) {
        pref0[i + 1] = pref0[i] + (s[i] == '0');
        pref1[i + 1] = pref1[i] + (s[i] == '1');
    }

    int cnt0 = pref0[n]; // total zeros

    vector<int> indices;

    // Identify mismatched positions
    for (int i = 0; i < n; i++) {
        char expected = (i < cnt0 ? '0' : '1');
        if (s[i] != expected) {
            indices.push_back(i + 1); // 1-based indexing
        }
    }

    // Already sorted
    if (indices.empty()) {
        cout << 0 << '\n';
        return;
    }

    // One reverse operation is sufficient
    cout << 1 << '\n';
    cout << indices.size();
    for (int idx : indices) {
        cout << " " << idx;
    }
    cout << '\n';
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int t;
    cin >> t;
    while (t--) {
        solve();
    }
    return 0;
}
