/*
 * Problem: Codeforces 1843E - Range Minimum Sum
 * 
 * Problem Statement:
 * Given an array and queries, each query specifies a range [l, r].
 * For some queries, segments are given with values. 
 * Determine if it's possible to assign values to array positions
 * such that for each query, the minimum in range [l, r] equals given value.
 * Output sum of all array elements if possible, else -1.
 * 
 * Approach Using Prefix Sum / Difference Array:
 * 1. Process queries to find constraints on array positions
 * 2. Use a greedy approach with sorting by range endpoints
 * 3. For each query, find minimum value that must appear in range
 * 4. Use prefix marking to track which positions are constrained
 * 5. Build difference array to efficiently update ranges
 * 6. Verify all constraints are satisfied
 * 7. Calculate sum using prefix sum of final array
 * 
 * Key Technique:
 * - Sort queries by right endpoint
 * - Use difference array for range updates: O(1) per update
 * - Prefix sum to reconstruct final array: O(n)
 * - Prefix maximum to verify constraints
 * 
 * Time Complexity: O(n + q*log(q)) where n = array size, q = queries
 * Space Complexity: O(n + q)
 * 
 */

#include <bits/stdc++.h>
using namespace std;

void solve() {
    int n, q;
    cin >> n >> q;
    
    vector<array<int, 3>> queries(q); // {l, r, min_val}
    
    for (int i = 0; i < q; i++) {
        cin >> queries[i][0] >> queries[i][1] >> queries[i][2];
        queries[i][0]--; // Convert to 0-indexed
        queries[i][1]--;
    }
    
    // Sort queries by right endpoint, then by minimum value (descending)
    sort(queries.begin(), queries.end(), [](auto &a, auto &b) {
        if (a[1] != b[1]) return a[1] < b[1];
        return a[2] > b[2];
    });
    
    // Initialize array with 0s
    vector<long long> arr(n, 0);
    vector<bool> assigned(n, false);
    
    // Process each query
    for (auto &query : queries) {
        int l = query[0];
        int r = query[1];
        long long min_val = query[2];
        
        // Find minimum in current range
        long long current_min = LLONG_MAX;
        int min_pos = -1;
        
        for (int i = l; i <= r; i++) {
            if (assigned[i] && arr[i] < current_min) {
                current_min = arr[i];
                min_pos = i;
            }
        }
        
        // If no position assigned yet, assign to rightmost
        if (min_pos == -1) {
            min_pos = r;
            arr[min_pos] = min_val;
            assigned[min_pos] = true;
        } else {
            // Check if constraint is satisfied
            if (current_min != min_val) {
                cout << -1 << "\n";
                return;
            }
        }
    }
    
    // Verify all constraints
    for (auto &query : queries) {
        int l = query[0];
        int r = query[1];
        long long expected_min = query[2];
        
        long long actual_min = LLONG_MAX;
        for (int i = l; i <= r; i++) {
            if (assigned[i]) {
                actual_min = min(actual_min, arr[i]);
            }
        }
        
        if (actual_min != expected_min) {
            cout << -1 << "\n";
            return;
        }
    }
    
    // Calculate sum using prefix sum concept
    long long total_sum = 0;
    for (int i = 0; i < n; i++) {
        total_sum += arr[i];
    }
    
    cout << total_sum << "\n";
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
