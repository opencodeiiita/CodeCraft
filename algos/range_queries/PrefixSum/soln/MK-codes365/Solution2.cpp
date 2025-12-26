#include <iostream>
#include <vector>

using namespace std;

/*
 * Problem: Range Sum Query - Immutable
 *
 * Approach: Prefix Sum Array & Fast I/O
 * 1. Precompute `P[i]` such that P[i] stores sum of nums[0...i-1].
 * 2. Range Sum(L, R) = P[R+1] - P[L].
 * 
 * Optimization:
 * - We use `ios_base::sync_with_stdio(false); cin.tie(NULL);` to speed up I/O,
 *   which is crucial for large test cases in competitive programming.
 *
 * Time Complexity: O(N) Build, O(1) Query
 * Space Complexity: O(N)
 */
class NumArray {
private:
    vector<int> prefix;

public:
    NumArray(vector<int>& nums) {
        // Fast I/O for competitive edge
        ios_base::sync_with_stdio(false); 
        cin.tie(NULL);

        int n = nums.size();
        prefix.resize(n + 1, 0);
        
        // Build prefix array: prefix[i] is sum of first i elements
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }
    }
    
    int sumRange(int left, int right) {
        // Constant time lookup
        return prefix[right + 1] - prefix[left];
    }
};

int main() {
    vector<int> nums = {-2, 0, 3, -5, 2, -1};
    NumArray* obj = new NumArray(nums);
    
    // queries: [0, 2], [2, 5], [0, 5]
    cout << "Query [0, 2]: " << obj->sumRange(0, 2) << endl; // Expected: 1
    cout << "Query [2, 5]: " << obj->sumRange(2, 5) << endl; // Expected: -1
    cout << "Query [0, 5]: " << obj->sumRange(0, 5) << endl; // Expected: -3
    
    delete obj;
    return 0;
}
