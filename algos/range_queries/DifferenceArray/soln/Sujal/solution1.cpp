//submission link - https://cses.fi/problemset/result/15793543/


/*
Problem:
You are given an array of n integers.
You need to process q queries of two types:
1) Add value u to all elements in range [a, b]
2) Print the value at position k

Queries are mixed and can come in any order.

Approach:
We use a Fenwick Tree (Binary Indexed Tree).

Idea:
- We convert range update into two point updates:
    add u at index a
    subtract u at index b+1
- Fenwick Tree stores these updates.
- For query type 2, we take prefix sum up to k
  and add it to the original value at index k.

This works because prefix sum gives
the total update applied to that position.

Time Complexity:
- Each update: O(log n)
- Each query: O(log n)
- Total: O((n + q) log n)

Space Complexity:
- O(n)
*/

#include<bits/stdc++.h>
using namespace std;

struct Fenwick{
    int n;
    vector<long long> bit;

    Fenwick(int n):n(n),bit(n+1,0){}

    void add(int i,long long v){
        for(;i<=n;i+=i&-i)
            bit[i]+=v;
    }

    long long sum(int i){
        long long s=0;
        for(;i>0;i-=i&-i)
            s+=bit[i];
        return s;
    }
};

int main(){
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n,q;
    cin>>n>>q;

    vector<long long>x(n+1);
    for(int i=1;i<=n;i++)
        cin>>x[i];

    Fenwick fw(n+1);

    while(q--){
        int type;
        cin>>type;

        if(type==1){
            int a,b;
            long long u;
            cin>>a>>b>>u;
            fw.add(a,u);
            fw.add(b+1,-u);
        }else{
            int k;
            cin>>k;
            cout<<x[k]+fw.sum(k)<<"\n";
        }
    }
}
