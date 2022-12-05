const fs = require('fs');

const fullData = JSON.parse(fs.readFileSync('source.json', 'utf-8'));
const shortData = fullData.slice(0, 10);

let data = fullData;

/*  Plan
(- Map data into arrays of ranges) - not needed
- array of arrays source change
- check against comparison
- build array of results

Tips
- all of these ranges are contiguous, so I only need to know the beginning and ends
- Math = Min1 < Min2 < Min2 < Max1 || Min2 < Min1 < Max1 < Max3
- Min1 should be the lowest of the mins
*/

let resultsArr = [];

data = data.map(el => {
    let range1 = el[0].split('-');
    let range2 = el[1].split('-');

    let min1 = Number(range1[0]);
    let max1 = Number(range1[1]);
    let min2 = Number(range2[0]);
    let max2 = Number(range2[1]);

    if (min1 <= min2) {
        if (checkContainment(min1,max1,min2,max2)) { resultsArr.push(el); }
    } else {
        if (checkContainment(min2,max2,min1,max1)) { resultsArr.push(el); }
    }

    return [el[0],el[1],min1,max1,min2,max2];
});

//console.table(data);
console.table(resultsArr);
console.log(resultsArr.length);

function checkContainment(minminmin, minminmax, maxminmin, maxminmax, final=0) {
    

    if (minminmin <= maxminmin && maxminmax <= minminmax) {
        return true;
    } else if (minminmin === maxminmin) {
        // to solve for equality I'll call checkContainment again, but on reverse inputs

        if (!final && checkContainment(maxminmin,maxminmax,minminmin,minminmax,1)) {
            return true;
        };
    }

    return false;
}