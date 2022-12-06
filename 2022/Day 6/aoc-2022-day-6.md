# Advent of Code - 2022 Day 6
https://adventofcode.com/2022/day/6

## Part 1
---
*Backstory* : You're given a comm unit that doesn't work.  You have to program it to listen for **start-of-packet markers** which are four unique characters in a row.

*Strategy Selected* : Craft a regular expression match to look for duplicate characters.

## Part 2
---
*Backstory* : Your comm unit is still not working because it also needs a **start-of-message marker** which is just like the **SOP marker**, but it is 14 unique characters.

*Strategy Selected* : The originial strategy of RegEx patterns worked well for part 2.

## Core Concepts :
---
*Puzzle Keys* :
- RegEx basics - [W3Schools RegEx Reference](https://www.w3schools.com/jsref/jsref_obj_regexp.asp)
```javascript
// constructor that allows for variables
new Regex(replacementString, flags)
```
- ```Array.slice()```

## Alternative Strategies
---
- One could have also looped through the sliced string with a while loop, instead of using RegEx
- I think there could be a really cool strategy that uses the NodeJS read buffer to stream this content without tying up the momory as I did in the source.json document.
