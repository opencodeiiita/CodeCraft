/*
Algorithm: Kth Smallest Element using Heap
Data Structure: Max Heap (Priority Queue)

Approach:
- Maintain a max heap of size k
- Traverse the array
- Push each element into heap
- If heap size exceeds k, pop the largest element
- Top of heap gives the k-th smallest element

Time Complexity: O(n log k)
Space Complexity: O(k)
*/

#include <bits/stdc++.h>
using namespace std;

int kthSmallest(int arr[], int n, int k) {
    priority_queue<int> pq;

    for (int i = 0; i < n; i++) {
        pq.push(arr[i]);
        if (pq.size() > k) {
            pq.pop();
        }
    }
    return pq.top();
}

int main() {
    int arr[] = {10, 20, -4, 5, 18, 24, 1, -7, 56};
    int n = sizeof(arr) / sizeof(arr[0]);
    int k = 4;

    cout << "Kth smallest element: " << kthSmallest(arr, n, k);
    return 0;
}
