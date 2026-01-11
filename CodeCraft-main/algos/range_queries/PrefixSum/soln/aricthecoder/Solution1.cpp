#include <bits/stdc++.h>
using namespace std;

/*
Given an integer array and multiple queries (l,r).
For Each query calculate the sum of elements between indices l and r.

Approach Using Prefix Sums
Create a prefix sum array
pre[i] = sum of elements from index 0 to i-1
sum = r+1,r,.......l+1
sum = pre[r+1] - pre[l] // 0-based indexing


Time Complexity: O(n+q)
Space Complexity: O(n)
*/

int main(){
    int n;
    cin>>n;

    // Input Array
    vector<int> a(n);
    for(int i=0; i<n; i++) cin>>a[i];

    // Build prefix sum array
    vector<int> pre(n+1,0);
    for(int i=0; i<n; i++)  pre[i + 1]=pre[i]+a[i];

    int q;
    cin>>q;

    // Input queries
    while(q--){
        int l, r;
        cin>>l>>r;
        cout<< pre[r+1] - pre[l] <<endl;
    }

}
