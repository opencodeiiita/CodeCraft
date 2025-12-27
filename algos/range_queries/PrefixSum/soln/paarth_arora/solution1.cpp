#include <bits/stdc++.h>
using namespace std;
vector<long long> prefixSum;
// approach used prefixSum is used to store the sum where prefixsum[i]=sum[arr[0]...,arr[i]]
  void  Number_Array(vector<int>& nums) {
               int n = nums.size();
        prefixSum.resize(n);
        if (n > 0) {
            prefixSum[0] = nums[0];
            for(int i = 1; i < n; i++)
                prefixSum[i] = prefixSum[i - 1] + nums[i];
        }
    }
long long sumR(int left, int right) {
        if (left == 0) return prefixSum[right];
        return prefixSum[right] - prefixSum[left - 1];// applying the formula sum[left,right]=prefix[right]-prefix[left-1]
    }


int main() {
    vector<int> nums = {-5, 0, 9, -11, 2, 89};//Given a integer array nums, asked to find the sum of numbers between index left and right (inclusive) 
    Number_Array (nums);
    cout << sumR(0, 2) << endl; //ans-4
    cout << sumR(2, 5) << endl; //ans-89
    return 0;
}
//time complexity preprocessing o(N) and during query o(1)
//space complexity o(N)
