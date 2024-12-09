# Advent of Code - 2024 Day 1
https://adventofcode.com/2024/day/1

| Property | Score |
|-------|---------|
|*Difficulty* :|⭐☆☆☆☆|
|*Fun* :|⭐⭐☆☆☆|
|*Time* :| Short (<1 hrs)|
|*Overall* :|⭐⭐☆☆☆|

## Part 1
---
*Backstory* : You are comparing two lists by distance between sorted elements.

*Strategy Selected* : I separated the data into two arrays, sorted them, and compared them.

## Part 2
---
*Backstory* : You want to see how similar those lists are by weighting by frequency of appearance.

*Strategy Selected* : I used the separated and sorted lists from above, but then looked for modes using the `filter()` method.

## Core Concepts :
---
*Puzzle Keys* :
- [Reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) - MDN web docs - Reduce Method- - [Filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) - MDN web docs - Filter Method

## Alternative Strategies
---
- **Risk** : I used find, when I needed filter.