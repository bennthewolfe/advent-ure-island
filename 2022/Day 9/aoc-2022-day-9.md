# Advent of Code - 2022 Day 9
https://adventofcode.com/2022/day/9

| Property | Score |
|-------|---------|
|*Difficulty* :|⭐⭐⭐⭐☆|
|*Fun* :|⭐⭐⭐☆☆|
|*Time* :| Long (~10 hrs)|
|*Overall* :|⭐⭐⭐☆☆|

## Part 1
---
*Backstory* : You are following the elves across a bridge. You want to model the movement of a rope to pass the time.  The head knot pulls around the tail knot.  Figure out where the tail has been.

*Strategy Selected* : Establish a coordinate plane, and a modeling engine that can deal with arbitrary head movements and calculate the tail movements, and log the results.  The tail always moves to the last head position when it moves.

## Part 2
---
*Backstory* : 

*Strategy Selected* : 

## Core Concepts :
---
*Puzzle Keys* :
- [Modulo](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder) - MDN - Remainder
- 

## Alternative Strategies
---
- **Risk / Trap** : Can the tail ever go to a position that the head had not been?  I would think so.
- **Risk / Trap** : You have to absolute value your distance comparisons.