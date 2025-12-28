/**
 * Problem: Corporate Flight Bookings
 *
 * Short Problem Statement:
 * There are N flights labeled from 1 to N. You are given a list of flight 
 * bookings. The j-th booking consists of (first, last, seats), meaning 
 * we reserve 'seats' for every flight in the range [first, last] (inclusive).
 * Return an array of length N where answer[i] is the total seats reserved for flight i+1.
 *
 * Approach:
 * 1. Convert 1-based indexing to 0-based for implementation ease, or handle 
 * indices directly. (Here we map 1->0, N->N-1).
 * 2. Use a Difference Array `diff` of size N+1.
 * 3. For each booking (first, last, seats):
 * - diff[first - 1] += seats
 * - diff[last] -= seats (because range is inclusive, we subtract at last+1)
 * 4. Compute prefix sums to get final seat counts.
 *
 * Time Complexity: O(N + B) where B is the number of bookings.
 * Space Complexity: O(N)
 *
 * Example I/O:
 * Input:
 * 5 3          (5 Flights, 3 Bookings)
 * 1 2 10       (Flights 1-2 get 10 seats)
 * 2 3 20       (Flights 2-3 get 20 seats)
 * 2 5 25       (Flights 2-5 get 25 seats)
 *
 * Output:
 * 10 55 45 25 25
 */

#include <iostream>
#include <vector>

using namespace std;

void solve() {
    int N, B; // N flights, B bookings
    if (!(cin >> N >> B)) return;

    vector<int> diff(N + 1, 0);

    for (int i = 0; i < B; ++i) {
        int first, last, seats;
        cin >> first >> last >> seats;

        // Convert 1-based index input to 0-based logic
        // Range: [first-1, last-1]
        // Update:
        diff[first - 1] += seats;
        
        // Determine boundary for subtraction
        // If last == N, last maps to index N, which is valid in size N+1 array
        if (last < N + 1) {
            diff[last] -= seats;
        }
    }

    // Prefix Sum Calculation
    vector<int> answer(N);
    int current_seats = 0;
    for (int i = 0; i < N; ++i) {
        current_seats += diff[i];
        answer[i] = current_seats;
    }

    for (int i = 0; i < N; ++i) {
        cout << answer[i] << (i == N - 1 ? "" : " ");
    }
    cout << endl;
}

int main() {
    ios::sync_with_stdio(0);
    cin.tie(0);
    solve();
    return 0;
}