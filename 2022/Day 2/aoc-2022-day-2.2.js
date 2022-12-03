const fs = require('fs');

const fullData = JSON.parse(fs.readFileSync('source.json','utf-8'));
const shortData = fullData.slice(0,10);

const data = fullData;

//console.table(data);

const legend = {"A":1,"B":2,"C":3,"X":1,"Y":2,"Z":3};
const winConditions = {"A":"Y","B":"Z","C":"X","X":"B","Y":"C","Z":"A"};
const loseConditions = {"A":"Z","B":"X","C":"Y","X":"A","Y":"C","Z":"A"};
const drawConditions = {"A":"X","B":"Y","C":"Z"};

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
        myPlay = loseConditions[el[0]];
        winScore = 0;
    } else if (el[1] === "Y") {
        // I draw
        myPlay = drawConditions[el[0]];
        winScore = 3;
    } else {
        // I win
        myPlay = winConditions[el[0]];
        winScore = 6;
    }

    switch (myPlay) {
        case "X":
            playScore = 1;
            break;
    
        case "Y":
            playScore = 2;
            break;
    
        case "Z":
            playScore = 3;
            break;
    
        default:
            break;
    }

    total = winScore + playScore;
    totalScore += total;

    return [el[0],el[1],winScore,playScore,total];
});

//console.table(outcomeTable);

console.log(totalScore);