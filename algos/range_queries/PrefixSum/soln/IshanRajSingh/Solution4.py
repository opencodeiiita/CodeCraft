# Submission Link: https://codeforces.com/problemset/submission/1843/356614985
# Approach: binary search on first query index such that any segment has > half ones using prefix sums
# Runtime: O((n+m) log q)
import sys
input=sys.stdin.readline

def check(mid, n, segs, ord):
    arr=[0]*n
    for i in range(mid):
        arr[ord[i]] = 1
    pref=[0]*(n+1)
    for i in range(n):
        pref[i+1]=pref[i]+arr[i]
    for l,r in segs:
        if pref[r+1]-pref[l] > (r-l+1)//2:
            return True
    return False

t=int(input().strip())
for _ in range(t):
    n,m=map(int,input().split())
    segs=[tuple(map(lambda x: int(x)-1, input().split())) for _ in range(m)]
    q=int(input().strip())
    ord=[int(input().strip())-1 for _ in range(q)]
    lo,hi=0,q+1
    while hi-lo>1:
        mid=(lo+hi)//2
        if check(mid,n,segs,ord):
            hi=mid
        else:
            lo=mid
    ans = hi if hi<=q else -1
    print(ans)
