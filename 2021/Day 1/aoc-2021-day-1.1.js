const fs = require('fs');

const fullData = JSON.parse(fs.readFileSync('source.json', 'utf-8'));
const shortData = fullData.slice(0, 10);

const data = fullData;

let outputArray = [];
let increasedCounter = 0;

//console.table(data);

data.forEach((val, index) => {
    if (index !== 0) {
        let prev = data[index - 1];

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