// Run with node --inspect [filename] to debug
// Run with node --watch index.js to watch for changes and run

fs = require('fs');

const fullData = JSON.parse(fs.readFileSync('source.json','utf-8'));
const shortData = fullData.slice(0,10);

// Uncomment the fullData overwrite to run against the full dataset
let data = shortData;
// data = fullData;

// console.table(data);

/* Strategy
- FAIL : If I sort an increasing array and it changes
- FAIL : If I sort a decreasing array and it changes
*/

let successArray = [];

let delta1Array = [];
let delta2Array = [];


data.forEach((element,i) => {
    let delta1 = [];
    let delta2 = [];

    // build delta arrays
    element.every((val,index) => {
        if (index === 0) {
            return true;
        } else if (index > 0) {
            delta1.push(val - element[index-1]);
            if (index > 1) {
                delta2.push(val - element[index-2]);
            }
            return true;
        }
    });

    delta1Array.push(delta1);
    delta2Array.push(delta2);

    if (! assessRules(element,i) ) {
        successArray.push(false);
        return false;
    }

    // Pass
    successArray.push(true);
    return true;   
});

console.table(data);
console.table(delta1Array);
console.table(delta2Array);

let successCount = successArray.filter((element) => element === true).length;
console.log(`Success Count: ${successCount}`);

function assessRules (element,i) {
    let recordIndex = i;

    let failures = 0;
    let lastFailed = false;

    return delta1Array[i].every(
        (val,index) => {
        }
    );
}