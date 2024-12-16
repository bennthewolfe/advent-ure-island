// Run with node --inspect [filename] to debug
// Run with node --watch index.js to watch for changes and run

fs = require('fs');

const fullData = JSON.parse(fs.readFileSync('source2.json','utf-8'));
const shortData = fullData.slice(0,10);

// Uncomment the fullData overwrite to run against the full dataset
let data = shortData;
data = fullData;

let columnsData = [];

// Create N <--> S Map
data.forEach((row) => {
    Array.from(row).forEach((char, index) => {
        if (columnsData[index] === undefined) {
            columnsData[index] = '';
        }
        columnsData[index] += char;
    });
});

// E <--> W Map
console.log("E <--> W Map");
console.table(data);
// N <--> S Map
console.log("N <--> S Map");
console.table(columnsData);