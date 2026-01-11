/*
    Problem: AtCoder Beginner Contest 129 B - Balance
    
    Short problem statement:
    Given N weights, divide them into two contiguous groups (indices 0 to T and T+1 to N-1).
    Calculate the minimum possible absolute difference between the sums of these two groups.
    
    Approach using prefix sums:
    1. First, calculate the total sum of all elements in the array.
    2. Iterate through the array while maintaining a running 'prefix_sum' (which represents the sum of the first group, S1).
    3. The sum of the second group (S2) can be derived in O(1) as: S2 = Total_Sum - S1.
    4. Calculate the absolute difference |S1 - S2| at each step and track the minimum value.
    
    Time & space complexity:
    Time: O(N) - iterate through the array twice (1. for total sum, 2. for finding min difference).
    Space: O(N) - To store the input array.

    Example I/O:
    Input:
    4
    1 3 1 1
    Output:
    2
*/

#include <bits/stdc++.h>
using namespace std;

void solve() {
    int n;
    cin >> n;

    vector<int> W(n);
    int total_sum = 0;

    for (int i = 0; i < n; ++i) {
        cin >> W[i];
        total_sum += W[i];
    }

    int min_diff = total_sum; 
    int curr_prefix_sum = 0;

    // Iterate through possible split points
    // go up to N-1 because the second group needs at least one element
    for (int i = 0; i < n - 1; ++i) {
        curr_prefix_sum += W[i];

        int s2 = total_sum - curr_prefix_sum;
        
        int diff = abs(curr_prefix_sum - s2);
        min_diff = min(min_diff, diff);
    }

    cout << min_diff << endl;
}

int main() {
    
    solve();
    return 0;
}