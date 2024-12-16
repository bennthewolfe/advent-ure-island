// Run with node --inspect [filename] to debug
// Run with node --watch index.js to watch for changes and run

fs = require('fs');

const fullData = JSON.parse(fs.readFileSync('source2.json','utf-8'));
const shortData = fullData.slice(0,10);

// Uncomment the fullData overwrite to run against the full dataset
let data = shortData;
data = fullData;

let columnsData = [];

let guardPos = [0,0]

// Create N <--> S Map and find the guard
data.forEach((row, index) => {
    Array.from(row).forEach((char, i) => {
        if (columnsData[i] === undefined) {
            columnsData[i] = '';
        }
        if (char === '^') {
            guardPos = [i, index];
            char = '.';

            // Remove the guard from the original map
            data[index] = data[index].split('');
            data[index].splice(i, 1,'.');
            data[index] = data[index].join('');
        }
        columnsData[i] += char;
    });
});

// E <--> W Map
console.log("E <--> W Map");
console.table(data);
// N <--> S Map
console.log("N <--> S Map");
console.table(columnsData);

console.log("Guard Position: ", guardPos);
