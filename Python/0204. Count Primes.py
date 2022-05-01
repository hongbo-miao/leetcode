# Given an integer n, return the number of prime numbers that are strictly less than n.
#
# Example 1:
#
# Input: n = 10
# Output: 4
# Explanation: There are 4 prime numbers less than 10, they are 2, 3, 5, 7.
#
# Example 2:
#
# Input: n = 0
# Output: 0
#
# Example 3:
#
# Input: n = 1
# Output: 0
#
# Constraints:
#
# 0 <= n <= 5 * 10^6


# Sieve of Eratosthenes
# https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes
class Solution:
    def countPrimes(self, n: int) -> int:
        if n <= 2:
            return 0
        primes = [True] * n
        primes[0] = primes[1] = False
        for i in range(2, int(n ** 0.5) + 1):
            if primes[i]:
                primes[i * i : n : i] = [False] * len(primes[i * i : n : i])
        return sum(primes)
