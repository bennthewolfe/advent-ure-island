// Run with node --inspect [filename] to debug
// Run with node --watch index.js to watch for changes and run

fs = require('fs');

const fullData = fs.readFileSync('source.json','utf-8');
const shortData = fullData.slice(0,1000);

// Uncomment the fullData overwrite to run against the full dataset
let data = shortData;
data = fullData;

// console.log(data);

const mult = /mul\((\d{1,3}),(\d{1,3})\)/g;

let sum = 0;

dontSplits = data.split("don\'t()");

for (const dontChunk of dontSplits) {
    let start = dontChunk.indexOf('do()');

    if (start >= 0) {
        let activeChunk = dontChunk.slice(start+4);

        let matches = activeChunk.matchAll(mult);

        for (const match of matches) {
            let add = match[1] * match[2];
            sum += add;
            // console.log(sum);
        }
    }
}

// above will miss the first section, but only until the first do().
let start = dontSplits[0].indexOf('do()');
let firstChunk = dontSplits[0].slice(0, start);
let matches = firstChunk.matchAll(mult);

for (const match of matches) {
    sum += match[1] * match[2];
    // console.log(sum);
}

console.log(sum);