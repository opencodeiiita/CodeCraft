/*
------------------------------------------------------------
 Problem: Range Update Queries
 Platform: CSES Problem Set
 Problem ID: 1651
 Link: https://cses.fi/problemset/task/1651/

 Task Summary:
 -------------
 - You are given an array of n integers.
 - You must process q queries of two types:
     1 a b u : increase all values in range [a, b] by u
     2 k     : output the value at position k

 Constraints:
 ------------
 - 1 ≤ n, q ≤ 2 * 10^5
 - 1 ≤ xi, u ≤ 10^9
 - Queries must be processed efficiently.

 Key Idea:
 ---------
 - Direct range updates are too slow.
 - Use a Fenwick Tree (Binary Indexed Tree) with a
   difference-array technique.

 Approach:
 ---------
 - Maintain a Fenwick Tree that stores only the "delta" changes.
 - For range update [l, r] by value u:
       diff[l]   += u
       diff[r+1] -= u
 - The actual value at position k is:
       original[k] + prefix_sum(diff, k)

 Time Complexity:
 ----------------
 - Range update: O(log n)
 - Point query : O(log n)
 - Total: O((n + q) log n)

 Space Complexity:
 -----------------
 - O(n)

------------------------------------------------------------
*/
package CodeCraft.algos.range_queries.DifferenceArray.soln.dwivediprashant;
import java.io.*;

public class Solution1 {

    /*
     Fenwick Tree (Binary Indexed Tree)
     Used here for:
     - Range Update
     - Point Query
    */
    static class Fenwick {
        int n;
        long[] bit;

        Fenwick(int n) {
            this.n = n;
            bit = new long[n + 1];
        }

        // Add value v at index i
        void add(int i, long v) {
            while (i <= n) {
                bit[i] += v;
                i += i & -i;
            }
        }

        // Prefix sum from 1 to i
        long sum(int i) {
            long s = 0;
            while (i > 0) {
                s += bit[i];
                i -= i & -i;
            }
            return s;
        }

        // Add value v to range [l, r]
        void rangeAdd(int l, int r, long v) {
            add(l, v);
            if (r + 1 <= n) add(r + 1, -v);
        }
    }

    public static void main(String[] args) throws Exception {
        FastScanner fs = new FastScanner(System.in);
        StringBuilder output = new StringBuilder();

        int n = fs.nextInt();
        int q = fs.nextInt();

        // Original array (1-indexed)
        long[] a = new long[n + 1];
        for (int i = 1; i <= n; i++) {
            a[i] = fs.nextLong();
        }

        Fenwick fw = new Fenwick(n);

        // Process queries
        while (q-- > 0) {
            int type = fs.nextInt();
            if (type == 1) {
                int l = fs.nextInt();
                int r = fs.nextInt();
                long u = fs.nextLong();
                fw.rangeAdd(l, r, u);
            } else {
                int k = fs.nextInt();
                long result = a[k] + fw.sum(k);
                output.append(result).append('\n');
            }
        }

        System.out.print(output.toString());
    }

    /*
     Fast input reader
     Required for large input size on CSES
    */
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

        long nextLong() throws IOException {
            int c, sign = 1;
            long val = 0;
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
