/*
Problem:
LeetCode 303 - Range Sum Query: Immutable

Then:
sum(L, R) = prefix[R] - prefix[L-1]   (if L > 0)

Time Complexity:
Preprocessing: O(N)
Each Query: O(1)

Space Complexity: O(N)


*/
#include <bits/stdc++.h>
using namespace std;

class NumArray
{
    vector<int> presum;

public:
    NumArray(vector<int> &nums)
    {
        presum = nums;
        for (int i = 1; i < nums.size(); i++)
        {
            presum[i] = presum[i - 1] + nums[i];
        }
    }

    int sumRange(int left, int right)
    {

        int l = left;
        int r = right;
        int ans = presum[right];
        if (l != 0)
            ans -= presum[l - 1];

        return ans;
    }
};

/**
 * Your NumArray object will be instantiated and called as such:
 * NumArray* obj = new NumArray(nums);
 * int param_1 = obj->sumRange(left,right);
 */
int main()
{
    int n;
    cin >> n;
    vector<int> nums = {1, 2, 3, 4, 5, 2};

    NumArray obj = NumArray(nums);

    cout << obj.sumRange(0, 2) << endl;
    cout << obj.sumRange(2, 5) << endl;
}