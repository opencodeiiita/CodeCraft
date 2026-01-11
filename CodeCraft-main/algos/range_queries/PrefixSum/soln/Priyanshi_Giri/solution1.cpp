#include <bits/stdc++.h>
using namespace std;

/*
Problem:
Given an array, answer multiple queries asking for the
sum of elements between indices left and right (inclusive).
*/

/*
Approach (Prefix Sum):
- Build prefixSum where prefixSum[i] = sum of elements from 0 to i-1
- Range sum:
  sum(left, right) = prefixSum[right + 1] - prefixSum[left]
*/

/*
Time Complexity:
- Preprocessing: O(n)
- Each query: O(1)

Space Complexity:
- O(n) for prefix sum array
*/

class NumArray {
    vector<int> prefixSum;

public:
    NumArray(vector<int>& nums) {
        prefixSum.resize(nums.size() + 1, 0);
        for (int i = 0; i < nums.size(); i++)
            prefixSum[i + 1] = prefixSum[i] + nums[i];
    }

    int sumRange(int left, int right) {
        return prefixSum[right + 1] - prefixSum[left];
    }
};

int main() {
    int n; 
    cin >> n;

    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];

    NumArray obj(nums);

    int q; 
    cin >> q;
    while (q--) {
        int l, r;
        cin >> l >> r;
        cout << obj.sumRange(l, r) << endl;
    }
    return 0;
}
