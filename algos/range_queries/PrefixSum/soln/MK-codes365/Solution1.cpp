#include <iostream>
#include <vector>
#include <numeric> // Required for std::partial_sum

using namespace std;

/*
 * Problem: Running Sum of 1d Array
 *
 * Approach: Standard Library (STL)
 * Instead of a raw loop, we use `std::partial_sum` from the <numeric> library.
 * This makes the code concise, readable, and idiomatic C++.
 *
 * Time Complexity: O(N)
 * Space Complexity: O(1) (Operating directly on input vector)
 */
class Solution {
public:
    vector<int> runningSum(vector<int>& nums) {
        // Using C++ STL to compute prefix sums in a single line
        partial_sum(nums.begin(), nums.end(), nums.begin());
        return nums;
    }
};

int main() {
    Solution sol;
    
    // Test Case 1
    vector<int> nums1 = {1, 2, 3, 4};
    vector<int> result1 = sol.runningSum(nums1);
    
    cout << "Test Case 1: ";
    for (int num : result1) cout << num << " ";
    cout << endl; // Expected: 1 3 6 10

    // Test Case 2
    vector<int> nums2 = {1, 1, 1, 1, 1};
    vector<int> result2 = sol.runningSum(nums2);
    
    cout << "Test Case 2: ";
    for (int num : result2) cout << num << " ";
    cout << endl; // Expected: 1 2 3 4 5

    return 0;
}
