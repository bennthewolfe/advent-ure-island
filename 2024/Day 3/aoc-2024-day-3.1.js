// Run with node --inspect [filename] to debug
// Run with node --watch index.js to watch for changes and run

fs = require('fs');

const fullData = fs.readFileSync('source.json','utf-8');
const shortData = fullData.slice(0,200);

// Uncomment the fullData overwrite to run against the full dataset
let data = shortData;
data = fullData;

// data = "mul(1,2)mul(1,3)multiply(1,2)";

// console.log(data);

const mult = /mul\((\d{1,3}),(\d{1,3})\)/g;

let matches = data.matchAll(mult);
let sum = 0;

for (const match of matches) {
    // console.log(match);
    // console.log([match[1], match[2]]);
    sum += match[1] * match[2];
}

console.log(sum);