# Advent of Code - 2024 Day 2
https://adventofcode.com/2024/day/2

| Property | Score |
|-------|---------|
|*Difficulty* :|★★★☆☆|
|*Fun* :|★★★★☆|
|*Time* :| Medium (>2 hrs)|
|*Overall* :|★★★★★|

⭐⭐⭐⭐⭐ 🌟🌟🌟🌟🌟 ☆☆☆☆☆ ★★★★★

## Part 1
---
*Backstory* : Checking on the Red-Nosed reactor to see if the reports on the levels are safe.

*Strategy Selected* : Check for failures in an `every()` loop.

## Part 2
---
*Backstory* : The problem dampener allows for one failure.

*Strategy Selected* : Use a delta array to see changes.

## Core Concepts :
---
*Puzzle Keys* :
- [Array Sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) - MDN Web Docs - Array Sort
- [Compare Arrays](https://www.freecodecamp.org/news/how-to-compare-arrays-in-javascript/) - Free Code Camp - Compare Arrays
- [Array.every()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every) - MDN Web Docs - Every loop
- 

## Alternative Strategies
---
- **Trap** : Array.sort() modifies the item. Old way : Use .slice() to make a copy before sorting.  New way : Use toSorted().
- **Trap** : Array.every() looks for a return and stops on falsiness.
- I tried to use the fact that arrays will or won't match after sorting as an efficiency play.  This was overall pretty dumb.  I eliminated this for part 2.
