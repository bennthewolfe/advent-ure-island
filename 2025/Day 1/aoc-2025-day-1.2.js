// Run with node --inspect [filename] to debug
// Run with node --watch index.js to watch for changes and run

const { dir } = require('console');
const { rootCertificates } = require('tls');

fs = require('fs');

const readData = fs.readFileSync('source.txt', 'utf-8');
const fullData = readData.split('\n').map(line => line.trim()).filter(line => line !== '');
const shortData = fullData.slice(0, 100);

// Uncomment the fullData overwrite to run against the full dataset
let data = shortData;
// data = fullData;

// console.table(data);

let position = 50;
let hits = 0;

let log = []

data.forEach(rot => {
    let additionalHits = 0
    const start = position;

    const dir = rot.charAt(0);
    const dist = parseInt(rot.slice(1));

    if (dir == 'R') {
        position += dist;
    } else {
        // dir L
        position -= dist;
    }

    additionalHits += Math.abs(Math.floor((position / 100)));

    if (position === 0) { additionalHits += 1; }

    position = position % 100;

    if (position < 0) { position += 100; }

    log.push([dir, dist, start, position, additionalHits]);

    hits += additionalHits;
})

console.table(log);
console.log('Zeroes: ', hits);