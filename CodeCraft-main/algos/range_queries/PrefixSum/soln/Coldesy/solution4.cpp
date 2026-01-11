#include <bits/stdc++.h>

using namespace std;
//Problem Statement:
// Monocarp had a regular bracket sequence s
//  of length n
//  (n
//  is even). He even came up with his own way to calculate its cost.

// He knows that in a regular bracket sequence (RBS), each opening bracket is paired up with the corresponding closing bracket. So he decided to calculate the cost of RBS as the sum of distances between pairs of corresponding bracket pairs.


// approach:
/*
    We binary search on the number of queries applied since once a segment becomes beautiful
    it stays beautiful. For a given k, we apply the first k+1 updates, build a prefix sum array,
    and check if any segment has more 1s than half its length. If yes, we try to minimize k;
    otherwise, we increase it. If no such k exists, the answer is -1.
*/
// Time Complexity: O((n+m)logq)
// Space Complexity: O(n+m+q)

vector < int > prefixSum(const vector < int > & a) {
    int n = a.size();
    vector < int > pref(n);

    pref[0] = a[0];
    for (int i = 1; i < n; i++) {
        pref[i] = pref[i - 1] + a[i];
    }

    return pref;
}


int main() {
    int t;
    cin >> t;
    while (t--) {
        int n, m, q;
        cin >> n >> m;
        int arr[m][2];
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < 2; j++) {
                cin >> arr[i][j];
            }
        }
        cin >> q;
        int qarr[q];
        for (int j = 0; j < q; j++) {
            cin >> qarr[j];
        }
        int l = 0;
        int h = q - 1;
        int minAns = -1;

        while (l <= h) {
            int k = (l + h) / 2;
            vector < int > opp(n, 0);
            for (int i = 0; i <= k; i++) {
                opp[qarr[i] - 1] = 1;
            }
            vector < int > prefixArr = prefixSum(opp);
            int noSuccess = 1;
            for (int i = 0; i < m; i++) {
                int L = arr[i][0] - 1;
                int R = arr[i][1] - 1;

                int one = prefixArr[R] - (L > 0 ? prefixArr[L - 1] : 0);

                int length = arr[i][1] - arr[i][0] + 1;
                if (one > length / 2) {
                    minAns = k;

                    noSuccess = 0;
                    break;
                }

            }
            if (noSuccess) {
                l = k + 1;

            }
            else {
                h = k - 1;
            }

        }
        if (minAns != -1) cout << minAns + 1 << endl;
        else {
            cout << -1 << endl;
        }

    }

}