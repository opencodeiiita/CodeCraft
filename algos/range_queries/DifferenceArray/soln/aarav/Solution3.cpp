/**
 * Problem: Car Pooling
 *
 * Short Problem Statement:
 * A car has a capacity `capacity`. You are given a list of trips, where
 * trip[i] = [num_passengers, from, to]. Passengers get in at `from` and 
 * get out at `to`. Return true if the car can pick up all passengers 
 * for all trips without exceeding capacity, false otherwise.
 *
 * Note: The range is typically [from, to). Passengers occupy seats at `from`
 * but strictly leave AT `to`. So index `to` does NOT have those passengers.
 *
 * Approach:
 * 1. Find the maximum location ID to size the difference array (or use a Map for sparse).
 * Assuming location IDs are small (< 1001), use a fixed array.
 * 2. For each trip (p, start, end):
 * - diff[start] += p
 * - diff[end] -= p   <-- Note: Subtract exactly at 'end', not 'end+1'
 * 3. Iterate through the difference array, maintaining a running sum (current load).
 * 4. If current load > capacity at any point, return False.
 *
 * Time Complexity: O(Max_Location + Trips)
 * Space Complexity: O(Max_Location)
 *
 * Example I/O:
 * Input:
 * 4            (Capacity)
 * 2            (Number of trips)
 * 2 1 5        (2 passengers, loc 1 to 5)
 * 3 3 7        (3 passengers, loc 3 to 7)
 *
 * Output:
 * False        (At loc 3, load is 2+3=5 which is > 4)
 */

#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

void solve() {
    int capacity, num_trips;
    cin >> capacity >> num_trips;

    // Assuming locations are between 0 and 1000
    int max_loc = 1001; 
    vector<int> diff(max_loc, 0);
    int last_drop_off = 0;

    for(int i = 0; i < num_trips; ++i) {
        int p, start, end;
        cin >> p >> start >> end;
        
        diff[start] += p;
        // Passengers leave AT 'end', so capacity frees up exactly at 'end'
        if(end < max_loc) {
            diff[end] -= p;
        }
        last_drop_off = max(last_drop_off, end);
    }

    bool possible = true;
    int current_load = 0;
    
    // Iterate only up to the last relevant point
    for(int i = 0; i <= last_drop_off; ++i) {
        current_load += diff[i];
        if(current_load > capacity) {
            possible = false;
            break;
        }
    }

    if(possible) cout << "True" << endl;
    else cout << "False" << endl;
}

int main() {
    ios::sync_with_stdio(0);
    cin.tie(0);
    solve();
    return 0;
}