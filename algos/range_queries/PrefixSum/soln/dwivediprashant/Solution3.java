/*
------------------------------------------------------------
 Problem: Reverse Sort
 Platform: Codeforces
 Contest: Codeforces Round #753 (Div. 3)
 Problem Link:
 https://codeforces.com/contest/1605/problem/B

 Submission Link:
 https://codeforces.com/contest/1605/submission/355299729
------------------------------------------------------------

 Problem Summary:
 ----------------
 Ashish has a binary string s of length n.
 He wants to sort it in non-decreasing order (all 0s first, then 1s).

 Allowed Operation:
 ------------------
 - Choose a subsequence (not necessarily contiguous).
 - The chosen subsequence must be in non-increasing order.
   (i.e., sequence of 1s followed by 0s is allowed)
 - Reverse this subsequence in-place.

 Goal:
 -----
 Find the minimum number of operations required to sort the string.
 It is guaranteed the answer is ≤ n.

 Key Insight:
 ------------
 - If the string is already sorted, no operation is needed.
 - Otherwise, the string can always be sorted in exactly ONE operation.
 - Construct the target sorted string:
      first all '0's, then all '1's
 - Collect all indices where the original string differs from the target.
 - These mismatched positions form a valid non-increasing subsequence:
      1s (that should be 0) followed by
      0s (that should be 1)
 - Reversing this subsequence fixes all mismatches in one operation.

 Time Complexity:
 ----------------
 O(n) per test case

 Space Complexity:
 -----------------
 O(n)

------------------------------------------------------------
*/

import java.io.*;
import java.util.*;

public class Solution3 {
    public static void main(String[] args) throws Exception {

        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringBuilder output = new StringBuilder();

        int t = Integer.parseInt(br.readLine().trim());

        while (t-- > 0) {

            int n = Integer.parseInt(br.readLine().trim());
            String s = br.readLine().trim();

            // Count number of zeros
            int zeroCount = 0;
            for (int i = 0; i < n; i++) {
                if (s.charAt(i) == '0') zeroCount++;
            }

            // Collect mismatched indices
            List<Integer> mismatch = new ArrayList<>();

            for (int i = 0; i < n; i++) {
                char expected = (i < zeroCount) ? '0' : '1';
                if (s.charAt(i) != expected) {
                    mismatch.add(i + 1); // 1-based indexing
                }
            }

            // If already sorted
            if (mismatch.isEmpty()) {
                output.append(0).append('\n');
            } else {
                // One operation is enough
                output.append(1).append('\n');
                output.append(mismatch.size());
                for (int idx : mismatch) {
                    output.append(" ").append(idx);
                }
                output.append('\n'); 
            }
        }

        System.out.print(output.toString());
    }
}
