# Submission Link: https://codeforces.com/contest/1605/submission/356614528
# Approach: find all 1s that should be 0 (from left) and all 0s that should be 1 (from right), if any mismatches do one operation
# Runtime: O(n) per test
import sys
input=sys.stdin.readline
t=int(input().strip())
for _ in range(t):
    n=int(input().strip())
    s=list(input().strip())
    zeros=sorted([i for i in range(n) if s[i]=='0'])
    ones=sorted([i for i in range(n) if s[i]=='1'])
    l, r=0,len(zeros)-1
    i, j=0,len(ones)-1
    left=0
    right=n-1
    badL=[]
    badR=[]
    # two pointers: from left find 1 before a zero that should be left
    lptr=0
    rptr=n-1
    while lptr<rptr:
        while lptr<n and s[lptr]=='0':
            lptr+=1
        while rptr>=0 and s[rptr]=='1':
            rptr-=1
        if lptr<rptr:
            badL.append(lptr+1)
            badR.append(rptr+1)
            lptr+=1
            rptr-=1
    if not badL:
        print(0)
    else:
        ops=badL+badR[::-1]
        print(1)
        print(len(ops),*ops)
