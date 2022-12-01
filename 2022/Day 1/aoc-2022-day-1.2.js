const fs = require('fs');

const fullData = JSON.parse(fs.readFileSync('source.json', 'utf-8'));
const shortData = fullData.slice(0, 10);

const data = fullData;

//console.log(data);

const outputArray = data.map((val, index) => {
    let sum = val.reduce((previousSum, newVal) => previousSum + newVal, 0);
    return sum;
});

//console.table(outputArray);

let ladenElves = [];

popElf();
popElf();
popElf();

console.table(ladenElves);

console.log(ladenElves[0].weight + ladenElves[1].weight + ladenElves[2].weight);

function popElf() {
    let weight = Math.max(...outputArray);
    let indexNum = outputArray.indexOf(weight);


    ladenElves.push({
        'indexNum': indexNum,
        'weight': weight
    });
    outputArray[indexNum] = 0;
}