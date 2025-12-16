// Run with node --inspect [filename] to debug
// Run with node --watch index.js to watch for changes and run

const fs = require('fs');

const fullData = fs.readFileSync('source.txt', 'utf-8').split("\r\n");
const shortData = fullData.slice(0, 10);

// Uncomment the fullData overwrite to run against the full dataset
let data = shortData;
data = fullData;

let total = 0;

data = data.map(x => {
    leftArr = findHighest(x, 'left');
    rightArr = findHighest(x.slice(leftArr[1] + 1), 'right');
    final = parseInt(leftArr[0].toString() + rightArr[0]);
    total += final;
    return [x, leftArr, rightArr, final];
});

console.table(data);

console.log('Total: ', total);

function findHighest(str, option = 'left') {
    let index = 0;
    let highest = parseInt(str.charAt(0));
    Array.from(str).forEach((element, i) => {
        element = parseInt(element);
        if (option === 'right' && i === 0) { return; }
        if (option === 'left' && i === str.length - 1) { return; }
        if (element > highest) {
            highest = element;
            index = i;
        }
    });
    return [highest, index]
}