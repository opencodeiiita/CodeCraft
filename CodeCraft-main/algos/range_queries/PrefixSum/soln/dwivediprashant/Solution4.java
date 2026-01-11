/*
------------------------------------------------------------
 Problem: E. Tracking Segments
 Platform: Codeforces
 Contest: Codeforces Round #1843
 Problem Link:
 https://codeforces.com/contest/1843/problem/E

 Submission Link:
 https://codeforces.com/contest/1843/submission/355300572
------------------------------------------------------------

 Problem Summary:
 ----------------
 - You are given an array a of size n, initially filled with zeros.
 - You are also given m segments [li, ri].
 - A segment is called "beautiful" if:
       number of ones > number of zeros in that segment.
 - You are given q updates, where each update sets a[x] = 1
   (each index appears only once).

 Task:
 -----
 Find the minimum number of updates after which at least one segment
 becomes beautiful. If it never happens, print -1.

 Key Observations:
 -----------------
 - After k updates, the array configuration is fixed.
 - If a segment of length len has `ones` count:
       ones > len - ones  ⇔  ones * 2 > len
 - The condition "segment becomes beautiful" is monotonic:
       if it becomes true at step k, it will remain true for all k' > k.

 Approach:
 ---------
 - Use Binary Search on the answer (number of applied updates).
 - For a fixed k:
     * Apply the first k updates.
     * Build prefix sum array of ones.
     * For each segment, compute number of ones using prefix sums.
     * Check if any segment satisfies the beauty condition.
 - Binary search finds the minimum k for which the condition holds.

 Time Complexity:
 ----------------
 - check(k): O(n + m)
 - Binary Search: O(log q)
 - Overall per test case: O((n + m) log n)

 Constraints are satisfied since sum of n ≤ 1e5.

------------------------------------------------------------
*/

import java.io.*;

public class Solution4 {

    static class Segment {
        int l, r;
        Segment(int l, int r) {
            this.l = l;
            this.r = r;
        }
    }

    static int n, m;
    static Segment[] segments;
    static int q;
    static int[] queries;

    // Checks if after k updates, at least one segment is beautiful
    static boolean check(int k) {
        int[] a = new int[n + 1];

        // Apply first k updates
        for (int i = 0; i < k; i++) {
            a[queries[i]] = 1;
        }

        // Prefix sum of ones
        int[] pref = new int[n + 1];
        for (int i = 1; i <= n; i++) {
            pref[i] = pref[i - 1] + a[i];
        }

        // Check all segments
        for (Segment seg : segments) {
            int ones = pref[seg.r] - pref[seg.l - 1];
            int len = seg.r - seg.l + 1;
            if (ones * 2 > len) {
                return true;
            }
        }
        return false;
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        StringBuilder out = new StringBuilder();

        int t = fs.nextInt();
        while (t-- > 0) {
            n = fs.nextInt();
            m = fs.nextInt();

            segments = new Segment[m];
            for (int i = 0; i < m; i++) {
                segments[i] = new Segment(fs.nextInt(), fs.nextInt());
            }

            q = fs.nextInt();
            queries = new int[q];
            for (int i = 0; i < q; i++) {
                queries[i] = fs.nextInt();
            }

            int left = 1, right = q, ans = -1;

            // Binary search on number of updates
            while (left <= right) {
                int mid = (left + right) / 2;
                if (check(mid)) {
                    ans = mid;
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            }

            out.append(ans).append('\n');
        }

        System.out.print(out.toString());
    }

    // Fast input reader for competitive programming
    static class FastScanner {
        private final byte[] buffer = new byte[1 << 16];
        private int ptr = 0, len = 0;
        private final InputStream in;

        FastScanner(InputStream in) {
            this.in = in;
        }

        int read() throws IOException {
            if (ptr >= len) {
                len = in.read(buffer);
                ptr = 0;
                if (len <= 0) return -1;
            }
            return buffer[ptr++];
        }

        int nextInt() throws IOException {
            int c, sign = 1, val = 0;
            do {
                c = read();
            } while (c <= ' ');

            if (c == '-') {
                sign = -1;
                c = read();
            }

            while (c > ' ') {
                val = val * 10 + (c - '0');
                c = read();
            }
            return val * sign;
        }
    }
}
