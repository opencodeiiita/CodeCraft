/*
Difference Array – Easy Example
Time Complexity: O(N + Q)
*/

#include <bits/stdc++.h>
using namespace std;

int main() {
    int n = 5;
    vector<int> diff(n + 1, 0);

    // range update [1,3] += 2
    diff[1] += 2;
    diff[4] -= 2;

    vector<int> arr(n, 0);
    arr[0] = diff[0];
    for (int i = 1; i < n; i++)
        arr[i] = arr[i - 1] + diff[i];

    for (int x : arr)
        cout << x << " ";

    return 0;
}
