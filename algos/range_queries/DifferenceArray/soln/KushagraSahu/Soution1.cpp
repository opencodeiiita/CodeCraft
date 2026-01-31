/*
Given an array of n integers, your task is to process q queries of the following types:

increase each value in range [a,b] by u
what is the value at position k?

Input
The first input line has two integers n and q: the number of values and queries.
The second line has n integers x_1,x_2,\dots,x_n: the array values.
Finally, there are q lines describing the queries. Each line has three integers: either "1 a b u" or "2 k".
Output
Print the result of each query of type 2.

Approach : we have to update the array multiple times so instead of running
a loop everytime we create a difference array and then take the prefixSum of it when we require the final array
Time Complexity : O(n) for calculating the prefix sum in the type 2 query
Space Complexity : O(n) because of arr and diff arr of size n
*/
#include <iostream>
using namespace std;
int main()
{
    int n,q;
    cin >>n>>q;
    long long int arr[n],diff[n];
    for (int i = 0; i < n; i++)
    diff[i] = 0;    
    for(int i=0;i<n;i++)
    cin >>arr[i];
    while(q--)
    {
        int type;
        cin >>type;
        if(type==1)
        {
            int a,b;
            long long int u;
            cin >>a>>b>>u;
            a--;
            b--;
            diff[a]+=u;
            if(b+1<n)
            diff[b+1]-=u;
        }
        else
        {
            int k;
            cin >>k;
            k--;
            long long sum=0;
            for(int i=0;i<=k;i++)
            sum+=diff[i];
            cout <<arr[k]+sum<<"\n";
        }
    }
}
