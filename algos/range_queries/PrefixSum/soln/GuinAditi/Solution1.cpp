/*
Problem:
Given an integer array gain, where gain[i] is the net gain in altitude,
return the highest altitude of a point.

Approach:
Maintain a running prefix sum and track the maximum altitude.

Time Complexity: O(n)
Space Complexity: O(1)
*/

#include <iostream>
#include <vector>
using namespace std;

int largestAltitude(vector<int>& gain) {
    int altitude = 0, maxAltitude = 0;

    for (int g : gain) {
        altitude += g;
        maxAltitude = max(maxAltitude, altitude);
    }

    return maxAltitude;
}

int main() {
    vector<int> gain = {-5,1,5,0,-7};
    cout << largestAltitude(gain);
    return 0;
}
