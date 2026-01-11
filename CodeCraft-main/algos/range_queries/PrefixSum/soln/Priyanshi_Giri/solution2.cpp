#include <bits/stdc++.h>
using namespace std;

/*
Problem:
Given an array, return its running sum where
runningSum[i] = sum of elements from index 0 to i.
*/

/*
Approach:
- Create a new array
- First element stays the same
- Each next element = previous sum + current value
*/

/*
Time Complexity: O(n)
Space Complexity: O(n)
*/

vector<int> runningSum(vector<int>& nums) {
    vector<int> arr(nums.size());
    arr[0] = nums[0];

    for (int i = 1; i < nums.size(); i++) {
        arr[i] = arr[i - 1] + nums[i];
    }
    return arr;
}

int main() {
    int n;
    cin >> n;

    vector<int> nums(n);
    for (int i = 0; i < n; i++) {
        cin >> nums[i];
    }

    vector<int> result = runningSum(nums);

    for (int x : result) {
        cout << x << " ";
    }
    cout << endl;

    return 0;
}
