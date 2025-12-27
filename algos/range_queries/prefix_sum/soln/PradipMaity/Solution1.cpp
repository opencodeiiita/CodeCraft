/*
Problem:
Given an array arr[] and integer K,
count number of subarrays whose sum >= K.

Approach:
Use prefix sum:
prefix[i] = sum of elements from 0 to i

For each index, we want:
prefix[j] - prefix[i-1] >= K
=> prefix[j] >= prefix[i-1] + K

So for each prefix, binary search
on sorted prefix values.

Time Complexity:
O(N logN)
Space:
O(N)
*/

#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    long long K;
    cin >> n >> K;

    vector<long long> a(n), prefix(n);
    for(int i = 0; i < n; i++) cin >> a[i];

    prefix[0] = a[0];
    for(int i = 1; i < n; i++)
        prefix[i] = prefix[i-1] + a[i];

    long long ans = 0;
    vector<long long> sortedPrefix;

    for(long long p : prefix){
        if(p >= K) ans++;

        long long need = p - K;
        ans += sortedPrefix.end() - upper_bound(sortedPrefix.begin(), sortedPrefix.end(), need);

        sortedPrefix.insert(lower_bound(sortedPrefix.begin(), sortedPrefix.end(), p), p);
    }

    cout << ans;
}
