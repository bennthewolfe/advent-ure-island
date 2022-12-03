const fs = require('fs');

const fullData = JSON.parse(fs.readFileSync('source.json','utf-8'));
const shortData = fullData.slice(0,10);

const data = fullData;

//console.table(data);

const legend = {"A":1,"B":2,"C":3,"X":1,"Y":2,"Z":3};
const winConditions = {"A":"Y","B":"Z","C":"X","X":"B","Y":"C","Z":"A"};

let outcomeTable = data;

outcomeTable = outcomeTable.map((el,index) => {
    let winScore = 0
    let playScore = legend[el[1]];

    if (winConditions[el[0]] === el[1]) {
        // win
        winScore = 6;
    } else if (winConditions[el[1]] === el[0]) {
        // lose
        winScore = 0;
    } else {
        // draw
        winScore = 3;
    }

    return [el[0],el[1],winScore,playScore,winScore+playScore];
});

//console.table(outcomeTable);

let totalScore = 0;

outcomeTable.forEach(el => {
    totalScore += el[4];
});

console.log(totalScore);