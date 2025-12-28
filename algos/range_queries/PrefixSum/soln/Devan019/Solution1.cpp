/*
    Problem: 1423. Maximum Points You Can Obtain from Cards
    Link: https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/

    Approach: Sliding Window (Prefix + Suffix Sum)

    Idea:
    You are allowed to pick exactly k cards from either the start or the end
    of the array. Instead of trying all combinations, we observe:

    👉 Picking k cards from the ends is equivalent to:
       Taking some cards from the left prefix and the remaining from the right suffix.

    Steps:
    1️⃣ First, take all k cards from the left and compute their sum (lsum).
       This is our initial maxScore.

    2️⃣ Then, gradually shift cards:
       - Remove one card from the left side
       - Add one card from the right side
       - Update the maximum score at each step

    We repeat this process k times to cover all valid combinations.

    Example:
    cardPoints = [1,2,3,4,5,6,1], k = 3
    Possible picks:
    - [1,2,3]
    - [1,2] + [1]
    - [1] + [6,1]
    - [5,6,1]

    Time Complexity:
    - O(K): We only iterate k times.

    Space Complexity:
    - O(1): No extra space used.
*/
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxScore(vector<int>& cardPoints, int k) {
        int maxscore = 0;
        int n = cardPoints.size();
        int lsum = 0;
        int rsum = 0;

        for(int  i = 0 ; i < k ; i++) lsum += cardPoints[i];
        maxscore = lsum;

        int j = 0;
        for(int i = k-1; i >= 0 ; i--){
            lsum -= cardPoints[i];
            rsum += cardPoints[n-1 - j];
            maxscore = max(maxscore, lsum + rsum);
            j++;
        }

        return maxscore;
    }
};
/**
 * Your Solution object will be instantiated and called as such:
 *
 * Solution obj;
 * int result = obj.maxScore(cardPoints, k);
 *
 * Where:
 * cardPoints -> vector of integers representing card values
 * k          -> number of cards to pick from either end
 * result     -> maximum obtainable score
 */
