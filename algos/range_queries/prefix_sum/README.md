## Prefix Sum – Medium Level

### Description
Prefix Sum technique is used to answer range sum queries efficiently.

### Formula
sum(l, r) = prefix[r] - prefix[l - 1]

### Complexity
Time: O(N + Q)  
Space: O(N)

### Language
C++     
