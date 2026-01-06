# Approach: use difference array with Fenwick Tree to support range add and point query
# Runtime: O((n+q) log n)
import sys
input=sys.stdin.readline

class BIT:
    def __init__(self,n):
        self.n=n
        self.bit=[0]*(n+1)
    def add(self,i,v):
        while i<=self.n:
            self.bit[i]+=v
            i+=i&-i
    def sum(self,i):
        s=0
        while i>0:
            s+=self.bit[i]
            i-=i&-i
        return s

n,q=map(int,input().split())
arr=list(map(int,input().split()))
bit=BIT(n)
for i in range(n):
    bit.add(i+1,arr[i])
    bit.add(i+2,-arr[i])

out=[]
for _ in range(q):
    qry=list(map(int,input().split()))
    if qry[0]==1:
        _,a,b,u=qry
        bit.add(a,u)
        bit.add(b+1,-u)
    else:
        _,k=qry
        out.append(str(bit.sum(k)))

print("\n".join(out))
