const fs = require('fs');

const fullData = JSON.parse(fs.readFileSync('source.json','utf-8'));
const shortData = fullData.slice(0,10);

const data = fullData;

//console.table(data);

/*
Rock = 1
Paper = 2
Scissors = 3
*/

const legend = {"A":1,"B":2,"C":3,"X":1,"Y":2,"Z":3};
const scoreToPlay = [[0,"A","B","C"],[0,"X","Y","Z"]];

/*
X means you need to lose, 
Y means you need to draw,
Z means you need to win
*/

let outcomeTable = data;

let totalScore = 0;

outcomeTable = outcomeTable.map((el,index) => {
    let winScore = 0
    let playScore = 0;
    let total = 0;
    let myPlay = '';

    // what should I play?
    if (el[1] === "X") {
        // I lose
        myPlay = el[0] === "A" ? 3 : legend[el[0]]-1;
        winScore = 0;
    } else if (el[1] === "Y") {
        // I draw
        myPlay = legend[el[0]];
        winScore = 3;
    } else {
        // I win
        myPlay = el[0] === "C" ? 1 : legend[el[0]]+1;
        winScore = 6;
    }

    playScore = myPlay;

    total = winScore + playScore;
    totalScore += total;

    return [el[0],el[1],winScore,playScore,total];
});

console.table(outcomeTable);

console.log(totalScore);