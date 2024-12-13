# Advent of Code - 2024 Day 6
https://adventofcode.com/2024/day/6

| Property | Score |
|-------|---------|
|*Difficulty* :|★★★★☆|
|*Fun* :|★★★★★|
|*Time* :| Long (~3 hrs)|
|*Overall* :|★★★★★|

⭐⭐⭐⭐⭐ 🌟🌟🌟🌟🌟 ☆☆☆☆☆ ★★★★★

## Part 1
---
*Backstory* : XMAS word search!

*Strategy Selected* : I'm going to turn this into several arrays rows, columns, diagonals (2x), and then I'm going to use a regex function to look for forwards and backwards.

## Part 2
---
*Backstory* : We were looking for MAS arranged in an X around a central A

*Strategy Selected* : I'm going to find check in order NW,SE,NE,SW

## Core Concepts :
---
*Puzzle Keys* :
- I had to figure out the relationship between a matrix and it's diagonals.
- [Switch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch) - MDN Web Docs - Switch

| Letter  | Pattern |
| ------------- | ------------- |
| M S   | Could start a match; look ahead for another M or s  |
| M S | Could comlete a match; look behind for expected match; and look ahead for completed expected match.  SUCCESS
| A | Might be the center of a match; look for a match that was expected here  |
| X | Ignore (bust matches that expected an A here)

## Alternative Strategies
---
- **Alternative Strategy** Thought about turning it into an array of arrays where the key is the letter position.  Then triggering off of the x and then disqualifying everything.
- **Alternative Strategy** You could make a new array for every letter whose value is the letters around it in all eight directions if it's valid, then all the finished directions would be matches, no regex this way.  {(4,3):[XMA,X,XMAS,X,XM,XM,XM,XMAS]}  This would be a fun way to do it.  This is essentially brute force, but you would have a cool data structure, and you could count any in the child arrays of length 4 (without regex).  I might do this one as an alternative.