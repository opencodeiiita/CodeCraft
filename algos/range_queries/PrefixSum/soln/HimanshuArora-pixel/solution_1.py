
"""
PROBLEM:
We need to find the sum of numbers from(st to ed) in a list.

Approach:
We create a list which stores the sum of numbers from list till that index

To find the sum from index st to ed':
   Take total till ed and subtract total till st - 1.

Time complexity:
 Initial processing: O(n)
 Finding Sum of the range: O(1)
"""


class Processor:
    def __init__(self, nums):
        self.prefix = []
        total_till_now = 0

        for n in nums:
            total_till_now += n
            self.prefix.append(total_till_now)


    def sum_of_range(self, st, ed):

        if st == 0:
            return self.prefix[ed]

        return self.prefix[ed] - self.prefix[st-1] #st-1 cause in sum range st is also included

#Example:
# nums = [1, 2, 3, 4, 5]
# trial = Processor(nums)
# print(trial.sum_of_range(2, 4)) # Sum of [3, 4, 5] = 12