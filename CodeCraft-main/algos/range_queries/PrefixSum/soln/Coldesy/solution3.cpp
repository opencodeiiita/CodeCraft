// Problem statement: Ashish has a binary string s
//  of length n
//  that he wants to sort in non-decreasing order.

// He can perform the following operation:

// Choose a subsequence of any length such that its elements are in non-increasing order. Formally, choose any k
//  such that 1≤k≤n
//  and any sequence of k
//  indices 1≤i1<i2<…<ik≤n
//  such that si1≥si2≥…≥sik

// Find the minimum number of operations required to sort the string in non-decreasing order. It can be proven that it is always possible to sort the given binary string in at most n
//  operations.

// Approach:
//     We first count the total number of 1s in the string. If all these 1s are already placed
//     in the last `count1` positions, no operation is needed. Otherwise, we need to move the
//     extra 1s from the left part to the right. Using a prefix-sum idea (count of 1s so far),
//     we track how many 1s are incorrectly placed and select positions to flip: first the
//     extra 1s on the left, then the required 0s to balance them. The collected indices form
//     the operation that fixes the string in one step.

// https://codeforces.com/problemset/submission/1605/355477364

//Time Complexity: O(n)
//Space Complexity: O(n)
#include <bits/stdc++.h>
using namespace std;
 
int main(){
    int t;
    cin>>t;
    while(t--){
        int n;
        int size=0;
        int count1=0;
        int count1k=0;
        cin>>n;
        string s;
        cin>>s;
        vector<int> ans;
        for(int i=0;i<n;i++){
            if(s[i]=='1'){
            count1++;}
        }
        for(int i=n-count1;i<n;i++){
            if(s[i]=='1'){
            count1k++;}
        }
        
        int x=count1-count1k;
        if(x==0){
            cout<<0<<endl;
            continue;
        }
        for(int i=0;i<n;i++){
            if(s[i]=='1'&&x>0){
            ans.push_back(i+1);
            x--;
            size++;
            }
            if(x==0&&s[i]=='0'){
                ans.push_back(i+1);
                size++;
            }
            
            
        }
        cout<<1<<endl;
        cout<<size<<' ';
        for(int i=0;i<size;i++){
            cout<<ans[i]<<' ';
        }
        cout<<endl;
        
        
    }
    
}