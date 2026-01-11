//LeetCode 303 – Range Sum Query (Immutable) using prefix sums

/*Precompute a prefix sum array where
prefix[i] = sum of nums[0] to nums[i-1]
Then each query is O(1):*/

#include <vector>
using namespace std;

class NumArray {
private:
    vector<int> prefix;

public:
    NumArray(vector<int>& nums) {
        prefix.push_back(0);
        for (int x : nums) {
            prefix.push_back(prefix.back() + x);
        }
    }

    int sumRange(int left, int right) {
        return prefix[right + 1] - prefix[left];
    }
};