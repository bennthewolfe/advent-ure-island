fs = require('fs');

const fullData = JSON.parse(fs.readFileSync('souce.json','utf-8'));
const shortData = fullData.slice(0,9);

let data = fullData;

//console.table(data);

/* Plan
- * Separate Elves into groups
- * Find Badge possibilities
- * Find Badge Priority
- * Find Priority Sum
*/

// Look up for priority - 0 for padding (removed for readability)
const priorityLookup = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function letterScore(letter) {
    return priorityLookup.indexOf(letter) +1;
}

let prioritySum = 0;
let data2 = [];

data.forEach((el,index) => {
    if (index % 3 === 0) {
        data2.push( [el,data[index+1],data[index+2]]);
    }
});

data2 = data2.map((el, index) => {
    let badge = findCommonChars(findCommonChars(el[0],el[1]),el[2]);

    let priority = letterScore(badge);
    prioritySum += priority;

    return [el[0],el[1],el[2],badge,priority];
});

function findCommonChars (needleStr,haystackStr) {
    let commonChars = [];

    for (let i = 0; i < needleStr.length; i++) {
        if (!commonChars.includes(needleStr.charAt(i)) && haystackStr.includes(needleStr.charAt(i))) {
            commonChars.push(needleStr.charAt(i));
        }
    }

    return commonChars.join('');
}

//console.table(data2);
console.log(prioritySum);