# Advent of Code - 2022 Day 8
https://adventofcode.com/2022/day/8

| Property | Score |
|-------|---------|
|*Difficulty* :|⭐⭐⭐⭐☆|
|*Fun* :|⭐⭐⭐☆☆|
|*Time* :| Long (~10 hrs)|
|*Overall* :|⭐⭐⭐☆☆|

## Part 1
---
*Backstory* : The elves want to set up a tree house and want to know if the forest is wooded enough.  Map the forest to see how many trees are visible based on their neighbors in all directions.

*Strategy Selected* : Give every tree a unique index. Create an array matrix of the row data, AND make a matrix of the columnar data.  Then we can use the same comparisons both ways.  For comparisons, we will use regex matching.

## Part 2
---
*Backstory* : The elves now want to select a treehouse location based on the scenic views, which is also dependent on the neighboring trees.

*Strategy Selected* : Use the same two matrices and take one more run through the data.

## Core Concepts :
---
*Puzzle Keys* :
- [Modulo](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder) - MDN - Remainder
- [Reverse String](https://www.geeksforgeeks.org/reverse-a-string-in-javascript/) - Geeks for Geeks - Reverse String
- [Sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) - MDN - Sort
- One puzzle key was figuring out the relationship of an index to find its column and row
- I used Regex matching to find if there were blocking trees, and where they were located.  I liked this strategy as I could use views as strings instead of processing them as arrays and doing the comparison other ways.  This allowed me to avoid doing a for iteration throughout my comparison trees, which was the most obvious and literal solution.  So I liked my regex strategy, especially as it gave me additional practice in Javascript Regex.

## Alternative Strategies
---
- **Risk / Trap** : The tree comparison rules could catch you, but like in many of the recent puzzles, if I had just read the whole clue.  I wouldn't have tripped.
- **Risk / Trap** : I tried to do some fancy bitwise comparison stuff, which would have been fun, but it didn't work out in my implementation, and I spent a lot of time, to only come back around to a more literal strategy.