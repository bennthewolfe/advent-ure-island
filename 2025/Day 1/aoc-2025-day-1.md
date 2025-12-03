# Advent of Code - 2025 Day 1
https://adventofcode.com/2025/day/1

| Property | Score |
|-------|---------|
|*Difficulty* :|★★★★☆|
|*Fun* :|★★★★★|
|*Time* :| Medium (~2 hrs)|
|*Overall* :|🌟🌟🌟🌟🌟|

## Part 1
---
*Backstory* : There's a safe with a 100 point padlock, and you have to figure out how many times the dial finishes on 0.

*Strategy Selected* : Parse out the direction and distance from each entry and use modulo 100 to determine the place on the dial.

## Part 2
---
*Backstory* : We actually need to count the amount of times that the dial crosses 0.

*Strategy Selected* : I want to parse out how many hundreds.  I'll have to deal more seriously with which side of zero I'm on.  Every sign change will be an additional hit.

## Core Concepts :
---
*Puzzle Keys* :
- [Modulus](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder) - MDN - Remainder (Modulus)

## Alternative Strategies
---
- **Risk / Trap** : Tricky thing
- **Trap** : How did you deal with rotations more than 100.  I noticed that the last two digits are all that matter, so you can drop the rest.  I guess you could deal with this in multiple ways, but I selected a Modulo 100.  I suspect that will hurt me in Part 2 which I suspect is how many times it goes past 0.
- **Trap** : My handling of the modulo wasn't actually that smart.  It worked for part 1 but didn't actually handle the positions correctly.  I had to change it for part 2.
- **Trap** : Watch out for the ordering of your Math.abs() and Math.floor().  Floors evaluate the next HIGHER integer after Math.abs().  This might actually benefit the puzzle solution, though.
