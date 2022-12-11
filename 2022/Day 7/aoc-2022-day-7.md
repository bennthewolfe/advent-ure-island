# Advent of Code - 2022 Day 6
https://adventofcode.com/2022/day/7

| Property | Score |
|-------|---------|
|*Difficulty* :|⭐⭐⭐|
|*Fun* :|⭐⭐⭐⭐⭐|
|*Time* :| Long (~3 hrs)|
|*Overall* :|⭐⭐⭐⭐⭐|

## Part 1
---
*Backstory* : The elves give you a computer with basic Unix-like command prompt that needs an update, but doesn't have enough free drive space.  Your input is the terminal output, and the goal is to find all the directories that are less than 100,000 in size.

*Strategy Selected* : The main idea here that I leaned into was that all statments function in a single directory context.  I called that PWD based on the "print working directory" command.  This context for every line onlocked everything for me.

## Part 2
---
*Backstory* : You now need to choose the smallest directory that is big enough to free up enough space to install the update.

*Strategy Selected* : Since I had mapped all the directories with their sizes, this was most of the way there.  I just needed to add a filter and a sort.

## Core Concepts :
---
*Puzzle Keys* :
- [Primitive vs. Reference Values](https://www.javascripttutorial.net/javascript-primitive-vs-reference-values/) - JavascriptTutorial.net - This one was really important, and bit me badly on the timing
- [For... In...](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in) - MDN -  For eaching through enumerable properties of an object
- [Filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) - MDN - Removes element not meeting a criteria
- [Sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) - MDN - Sorting function
- Using absolute paths as unique names for things

## Alternative Strategies and Other Thoughts
---
- I feel like this one had a lot of possible strategies
    - I think it might have been cool to tabulate the first pass, instead of building a directory structure and then summing the file sizes.
    - I felt like I should use classes on this one for commands and outputs.
- I noticed pretty early on that ```$ ls``` was a throwaway command
- **Trap** : It's very well highlighted, but not understanding the redundant impact of file size up a directory tree.
- **Risk / Trap** : A lot of possible solutions would have a risk if you assumed the filenames and directory names were unique, but in most computers, they wouldn't have to be.  I don't think Eric's input data exploited this trap.
- **Risk / Trap** : His data could have tried to ```cd ..``` at the root directory. That would have been interesting.
- This was super fun because like other recent puzzles, it really played with the input.  It wasn't just lines of data, like some of the earlier puzzles were repetitively.  Very unique sort of situation to solve.
- I really got stuck on the Refrernce Values in this one.  This was a good workshop for that.
- I haven't used sort much.  I need more practice, but this was a good first start.