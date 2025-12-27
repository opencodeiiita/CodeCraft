/*
 * Problem: Codeforces 1605B - Reverse Sort
 * 
 * Problem Statement:
 * Given a binary string, sort it in non-decreasing order (all 0s before 1s)
 * by reversing subsequences. Find minimum operations needed.
 * 
 * Approach:
 * 1. The target string has all 0s first, then all 1s
 * 2. Count total 0s to determine where split should occur
 * 3. Use prefix counting to identify positions where:
 *    - A '1' appears in the 0s section (wrong position)
 *    - A '0' appears in the 1s section (wrong position)
 * 4. These positions can be fixed in exactly 1 operation
 * 5. If string is already sorted, answer is 0
 * 
 * Key Insight (Prefix Sum Relation):
 * We can use counting (a form of prefix sum) to determine:
 * - How many 0s should come before position i
 * - Whether current position has correct digit
 * 
 * Time Complexity: O(n) where n is string length
 * Space Complexity: O(n) for storing wrong positions
 * 
 */

#include <bits/stdc++.h>
using namespace std;

void solve() {
    int n;
    string s;
    cin >> n >> s;
    
    // Create sorted version to compare
    string sorted_s = s;
    sort(sorted_s.begin(), sorted_s.end());
    
    // Check if already sorted
    if (s == sorted_s) {
        cout << 0 << "\n";
        return;
    }
    
    // Find all positions that are in wrong place
    vector<int> wrong_positions;
    
    for (int i = 0; i < n; i++) {
        if (s[i] != sorted_s[i]) {
            wrong_positions.push_back(i + 1); // 1-indexed
        }
    }
    
    // Output result
    cout << 1 << "\n"; // Only 1 operation needed
    cout << wrong_positions.size() << " ";
    for (int pos : wrong_positions) {
        cout << pos << " ";
    }
    cout << "\n";
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int t;
    cin >> t;
    
    while (t--) {
        solve();
    }
    
    return 0;
}
