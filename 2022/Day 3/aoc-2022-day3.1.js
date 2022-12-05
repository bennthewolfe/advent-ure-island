fs = require('fs');

const fullData = JSON.parse(fs.readFileSync('souce.json','utf-8'));
const shortData = fullData.slice(0,10);

let data = fullData;

//console.table(data);

/* Plan
- * Separate rucksacks into halves
- * Find error
- * Create lookup for priority
- * Sum priorities
*/

// Look up for priority - 0 for padding (removed for readability)
const priorityLookup = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function letterScore(letter) {
    return priorityLookup.indexOf(letter) +1;
}

let prioritySum = 0;

data = data.map((el,index) => {
    // separates rucksacks
    let halfChar = el.length/2;
    let firstSack = el.slice(0,halfChar);
    let secondSack = el.slice(halfChar);

    // find error
    let oopsie = '';
    let i = 0;
    while (oopsie === '' && i < firstSack.length) {
        oopsie = secondSack.includes(firstSack.charAt(i)) ? firstSack.charAt(i) : '';
        i++
    }

    // add priority
    let priority = letterScore(oopsie);

    // sum
    prioritySum += priority;

    return [firstSack,secondSack,oopsie,priority];
});

//console.table(data);
console.log(prioritySum);