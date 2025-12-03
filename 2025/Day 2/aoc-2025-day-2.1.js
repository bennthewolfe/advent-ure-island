// Run with node --inspect [filename] to debug
// Run with node --watch index.js to watch for changes and run

fs = require('fs');

const readData = fs.readFileSync('source-test.txt', 'utf-8');
const fullData = readData.split(',').map(line => line.trim().split('-'));
const shortData = fullData.slice(0, 10);

// Uncomment the fullData overwrite to run against the full dataset
let data = shortData;
data = fullData;

console.table(data);

console.log('Count of full data: ', fullData.length);

console.log(checkRange(data[0][0], data[0][1]));

range(15).forEach(x => {
    console.log(`Matching Patterns for ${x} :`, getMatchingPatterns(x));
});



function checkRange(start, end) {
    let matches = new Set();

    let digits = [start.length, end.length]
    let matchingPatternsStart = getMatchingPatterns(digits[0]);
    let matchingPatternsEnd = getMatchingPatterns(digits[1]);


    return matches;
}

function getMatchingPatterns(digits) {
    let possibleFactors = range(digits);

    let matchingPatterns = [];

    possibleFactors.forEach(x => {
        digits % x === 0 ? matchingPatterns.push(x) : null;
    });

    // remove itself
    matchingPatterns.pop();

    return matchingPatterns;
}

function range(end) {
    let array = [];
    for (let i = 1; i <= end; i++) { array.push(i); }

    return array;
}

/*
Digits => Matching patterns => prime factors
1 = [] = 1 = 
2 = [aa] = 2 = 
3 = [aaaa] = 3 = 
4 = [aaaa,ababab] = 2x2 = 1+ 4%2,
5 = [aaaaa] = 5
6 = [aaaaaa,ababab,abcabc] = 2x3 = 1 + 6%2 + 6%3
7 = [aaaaaaa] = 7
8 = [aaaaaaaa,abababab,abcdabcd] = 2x2x2
9 = [aaaaaaaaa,abcabcabc] = 3x3
10 = [aaaaaaaaaa,ababababab,abcdeabcde] = 2x5
11 = [aaaaaaaaaaa] = 11
12 = [aaaaaaaaaaaa,abababababab,abcabcabcabc,abcdabcdabcd,abcdefgabcdefg] = 2x2x3
13
14
15 = [aa,abcabcabcabc,abcdeabcdeabcde] = 3x5 = 15%3,15%5

Find how many subgroupings might exist
*/