/*
Medium Prefix Sum Example
Issue #108
*/

#include <bits/stdc++.h>
using namespace std;

int main() {
    vector<int> arr = {1, 2, 3, 4, 5};
    int n = arr.size();

    vector<int> prefix(n);
    prefix[0] = arr[0];

    for (int i = 1; i < n; i++)
        prefix[i] = prefix[i - 1] + arr[i];

    int l = 1, r = 3; // range [1,3]
    int sum = prefix[r] - (l > 0 ? prefix[l - 1] : 0);

    cout << "Range Sum: " << sum << endl;
    return 0;
}
