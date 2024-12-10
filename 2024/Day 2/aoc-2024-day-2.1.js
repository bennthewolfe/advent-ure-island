// Run with node --inspect [filename] to debug
// Run with node --watch index.js to watch for changes and run

fs = require('fs');

const fullData = JSON.parse(fs.readFileSync('source.json','utf-8'));
const shortData = fullData.slice(0,10);

// Uncomment the fullData overwrite to run against the full dataset
let data = shortData;
data = fullData;

// console.table(data);

/* Strategy
- FAIL : If I sort an increasing array and it changes
- FAIL : If I sort a decreasing array and it changes
*/

let successArray = [];

data.forEach((element) => {
    let sortedElement;
    let sortOrder;

    // determine sort order
    if (element[0] < element[element.length-1]) {
        // ascending
        sortOrder = 'asc';
        sortedElement = element.toSorted((a,b)=>a-b);
    } else if (element[0] > element[element.length-1]) {
        // descending
        sortOrder = 'desc';
        sortedElement = element.toSorted((a,b)=>b-a);
    } else {
        // equal
        successArray.push(false);
        return false;
    }

    if (sortedElement.toString() !== element.toString()) {
        // array not sorted
        successArray.push(false);
        return false;
    }

    if (! assessRules(sortedElement) ) { successArray.push(false); return false; }

    // Pass
    successArray.push(true);
    return true;   
});

// console.table(successArray);

let successCount = successArray.filter((element) => element === true).length;
console.log(`Success Count: ${successCount}`);

function assessRules (element) {
    return element.every(
        (val,index,arr) => {
            if (index > 0) {
                let diff = Math.abs(val - arr[index-1]);
                if (diff < 1 || diff > 3) {
                    return false;
                }
            }
            return true;
        }
    )
}