/*
Binary Search Algorithm

Description:
Binary Search is an efficient searching algorithm used on sorted arrays.
It works by repeatedly dividing the search interval in half.

Algorithm:
1. Set low = 0 and high = n - 1
2. While low <= high:
   a. mid = low + (high - low) / 2
   b. If arr[mid] == target, return mid
   c. If arr[mid] < target, set low = mid + 1
   d. Else set high = mid - 1
3. If not found, return -1

Time Complexity: O(log n)
Space Complexity: O(1)

Sample:
Input:  [1, 3, 5, 7, 9], target = 5
Output: 2
*/

#include <iostream>
using namespace std;

int binarySearch(int arr[], int n, int target) {
    int low = 0, high = n - 1;

    while (low <= high) {
        int mid = low + (high - low) / 2;

        if (arr[mid] == target)
            return mid;
        else if (arr[mid] < target)
            low = mid + 1;
        else
            high = mid - 1;
    }

    return -1;
}

int main() {
    int arr[] = {1, 3, 5, 7, 9};
    int n = sizeof(arr) / sizeof(arr[0]);
    int target = 5;

    int result = binarySearch(arr, n, target);

    if (result != -1)
        cout << "Element found at index " << result << endl;
    else
        cout << "Element not found" << endl;

    return 0;
}
