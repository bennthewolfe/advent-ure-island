// Run with node --inspect [filename] to debug
// Run with node --watch index.js to watch for changes and run

fs = require('fs');

const fullData = JSON.parse(fs.readFileSync('source.json','utf-8'));
const shortData = fullData.slice(0,10);

// Uncomment the fullData overwrite to run against the full dataset
let data = shortData;
data = fullData;

data = [
[1,2,3,10,11,15],
[7,6,4,2,1],
[1,2,7,8,9],
[9,7,6,2,1],
[1,3,2,4,5],
[8,6,4,4,1],
[1,3,6,7,9]
];

// console.table(data);

/* Strategy
- FAIL : If I sort an increasing array and it changes
- FAIL : If I sort a decreasing array and it changes
*/

let successArray = [];

data.forEach((element,index) => {
    // determine sort order and normalized to asc
    if (element[0] < element[element.length-1]) {
        // ascending
    } else if (element.sort()[0] < element[element.length-1]) {
        // descending
    }

    if (! assessRules(element) ) { successArray.push(false); return false; }

    // Pass
    successArray.push(true);
    return true;   
});

// console.table(successArray);

let successCount = successArray.filter((element) => element === true).length;
console.log(`Success Count: ${successCount}`);

function assessRules (element) {
    let failures = 0;
    let lastFailed = false;

    return element.every(
        (val,index,arr) => {
            if (index > 0) {
                let diff = val - arr[index-1];
                if (lastFailed) {
                    diff = val - arr[index-2];
                }
                if (diff < 1 || diff > 3) {
                    if (failures > 0) {
                        return false;
                    } else {
                        failures++;
                        lastFailed = true;
                    }
                } else {
                    lastFailed = false;
                }
            }
            return true;
        }
    )
}