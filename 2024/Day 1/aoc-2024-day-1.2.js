fs = require('fs');

const fullData = JSON.parse(fs.readFileSync('source.json','utf-8'));
const shortData = fullData.slice(0,10);

let data = shortData;
data = fullData;

// console.table(data);

/*
- Arrange the data into two lists
- Sort both lists
- Then the indexes will be able to compare
*/

let array1 = [];
let array2 = [];
let similiarity = [];

// separate into two lists
data.forEach((item) => {
    array1.push(item[0]);
    array2.push(item[1]);
});

array1.sort();
array2.sort();

// calculate distance
array1.forEach((element)=> {
    let score = array2.filter(
        (item) => item === element
    ).length;
    similiarity.push(score * element);
})

// console.table(array1);
// console.table(array2);
// console.table(similiarity);

let solution = similiarity.reduce((acc,cur) => acc + cur, 0);

console.log(solution);