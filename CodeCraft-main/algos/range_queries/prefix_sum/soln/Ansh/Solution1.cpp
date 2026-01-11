/*
Problem Statement:
Given an array of n integers, we have to answer q queries where each query asks for the sum of elements from index L to R (0-based indexing).
Approach (Using Prefix Sums):
We first compute a prefix sum array `pref_sum` where pref_sum[i] stores the sum of elements from index 0 to i.
To answer a query [L, R], we can directly use:
    sum = pref_sum[R] - (L > 0 ? pref_sum[L-1] : 0)
This allows each query to be answered in O(1) time after O(n) preprocessing.
Time Complexity:
O(n + q) where n is the size of the array and q is the number of queries
Space Complexity:
O(n) for the prefix sum array
Example:
Input:
5
1 2 3 4 5
1
1 3
Output:
9
Explanation:
pref_sum array: [1, 3, 6, 10, 15]
Query (L=1, R=3): sum = pref_sum[3] - pref_sum[0] = 10 - 1 = 9
*/

#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n; 
    cin >> n;
    vector<int> arr(n), pref_sum(n);
    for(int i = 0; i < n; i++){
        cin >> arr[i];
    }
    pref_sum[0]=arr[0] ;
    for(int i = 1 ; i<n ; i++){
        pref_sum[i]=pref_sum[i-1]+arr[i] ;
    }

    int q; 
    cin >> q;
    while(q--){
        int L, R; 
        cin >> L >> R;
        int ans = (L == 0 ? pref_sum[R] : pref_sum[R] - pref_sum[L-1]);
        cout << ans << endl;
    }
    return 0;
}
