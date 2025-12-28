#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, q;
    cin >> n >> q;

    vector<long long> diff(n + 1, 0);

    for (int i = 0; i < q; i++) {
        int L, R;
        long long X;
        cin >> L >> R >> X;
        diff[L] += X;
        if (R + 1 < n) diff[R + 1] -= X;
    }

    vector<long long> finalArr(n);
    finalArr[0] = diff[0];

    for (int i = 1; i < n; i++) {
        finalArr[i] = finalArr[i - 1] + diff[i];
    }

    for (int i = 0; i < n; i++) {
        cout << finalArr[i] << " ";
    }
    cout << "\n";

    return 0;
}
