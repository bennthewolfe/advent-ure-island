const fs = require('fs');

const fullData = JSON.parse(fs.readFileSync('source.json','utf-8'));
const shortData = fullData.slice(0,10);

const data = fullData;

//console.log(data);

const outputArray = data.map((val, index)=>{
    let sum = val.reduce((previousSum,newVal) => previousSum + newVal, 0);
    return sum;
});

//console.table(outputArray);

console.log(Math.max(...outputArray));