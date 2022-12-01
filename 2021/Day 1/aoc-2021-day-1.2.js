const fs = require('fs');

const fullData = JSON.parse(fs.readFileSync('source.json', 'utf-8'));
const shortData = fullData.slice(0, 10);

const data = fullData;

let outputArray = [];
let increasedCounter = 0;

//console.table(data);

let sums = []
let total = 134+138;

data.forEach((val, index) => {
    if (index > 1) {
        let prev3 = index == 2 ? 0 : data[index-3];

        total = total - prev3 + val;

        sums.push(total);
    }
})

console.table(sums);

sums.forEach((val, index) => {
    if (index !== 0) {
        let prev = sums[index - 1];

        if (val > prev) {
            outputArray.push('increased');
            increasedCounter++;
        } else {
            outputArray.push('other');
        }
    }
});

//console.log(outputArray);
console.log(increasedCounter);