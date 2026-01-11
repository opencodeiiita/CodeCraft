/*
Problem:
Given an array arr[] of size N and Q range update queries:
Each query: (L, R, X)
Add value X to every element in range [L, R].
Print final array after all updates.

Approach (Difference Array + Prefix Sum):
Instead of updating each index in range (O(N) per query),
we use a difference array:

diff[L] += X
diff[R + 1] -= X   (if R+1 < N)

After processing all queries,
take prefix sum of diff[] to get final values.

Time Complexity:
O(N + Q)

Space Complexity:
O(N)

Example:
arr = [1,2,3,4]
Query: (1,3,+2)
Result: [1,4,5,6]
*/

#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, q;
    cin >> n >> q;

    vector<long long> arr(n), diff(n+1, 0);
    for(auto &x : arr) cin >> x;

    while(q--){
        int L, R, X;
        cin >> L >> R >> X; // 0-based indexing

        diff[L] += X;
        if(R + 1 < n) diff[R + 1] -= X;
    }

    long long curr = 0;
    for(int i = 0; i < n; i++){
        curr += diff[i];
        arr[i] += curr;
    }

    for(long long x : arr) cout << x << " ";
}
