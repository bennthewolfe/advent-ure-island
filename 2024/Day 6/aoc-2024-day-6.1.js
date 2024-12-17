// Run with node --inspect [filename] to debug
// Run with node --watch index.js to watch for changes and run

const { create } = require('domain');

fs = require('fs');

const fullData = JSON.parse(fs.readFileSync('source2.json','utf-8'));
const shortData = fullData.slice(0,10);

// Uncomment the fullData overwrite to run against the full dataset
let data = shortData;
data = fullData;

let columnsData = [];

// Guard Position : [x,y,directionality]
// directionality = X%3 = 0 -> N, 1 -> E, 2 -> S, 3 -> W
let guardPos = [0,0,0];

let visitedPositions = [];

// Create N <--> S Map and find the guard
data.forEach((row, index) => {
    Array.from(row).forEach((char, i) => {
        if (columnsData[i] === undefined) {
            columnsData[i] = '';
        }
        if (char === '^') {
            guardPos = [i,index,1];
            char = '.';

            // Remove the guard from the original map
            data[index] = data[index].split('');
            data[index].splice(i, 1,'.');
            data[index] = data[index].join('');
        }
        columnsData[i] += char;
    });
});

// E <--> W Map
console.log("E <--> W Map");
console.table(data);
// N <--> S Map
console.log("N <--> S Map");
console.table(columnsData);

console.log("Guard Position: ", guardPos);

// Run the guard program
let continueGuard = true;

while (continueGuard) {
    let moveGuardResult = 0;
    let range = [];

    switch (guardPos[2]) {
        case 0:
            // N
            moveGuardResult = moveGuard(guardPos[1],columnsData[guardPos[0]]);
            if (moveGuardResult) {
                for (let i = 0; i < length; i++) {
                    range.push(startingPos+i);
                }
                addVisitedPosition();
                guardPos = [guardPos[0],guardPos[1]-moveGuardResult,guardPos[2]];
            }
            break;
        case 1:
            // E
            moveGuardResult = moveGuard(guardPos[0],data[guardPos[1]]);
            break;
        case 2:
            // S
            moveGuardResult = moveGuard(guardPos[1],columnsData[guardPos[0]].reverse());
            break;
        case 3:
            // W
            moveGuardResult = moveGuard(guardPos[0],data[guardPos[1]].reverse());
            break;
    }

    // Add the visited positions to the visitedPositions array

    // turn right
    guardPos[2] = (guardPos[2]+1)%3;

}


function moveGuard(startingPos,path) {
    let moveAhead = 0;
    endingPos = path.indexOf('#',startingPos);

    if (endingPos > -1) {
        moveAhead = endingPos - startingPos;
    } else {
        continueGuard = false;
    }

    return moveAhead;
}

// can be array or individual position
function addVisitedPosition(pos) {
    if (typeof pos === 'array') {
        pos.forEach((p) => {
            visitedPositions[p]=true;
        });
    } else {
        visitedPositions[pos]=true;
    }
    return true;
}
