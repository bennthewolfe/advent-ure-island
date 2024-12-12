// Run with node --inspect [filename] to debug
// Run with node --watch index.js to watch for changes and run

const { create } = require('domain');

fs = require('fs');

const fullData = JSON.parse(fs.readFileSync('source.json','utf-8'));
const shortData = fullData.slice(0,10);

// Uncomment the fullData overwrite to run against the full dataset
let data = shortData;
data = fullData;

let xmas1 = /XMAS/g;
let xmas2 = /SAMX/g;

let rowsPuzzle = data;
let columnsPuzzle = createColumnsPuzzle(data);
let rightDiagPuzzle = createRightDiagPuzzle(data);
let leftDiagPuzzle = createLeftDiagPuzzle(data);

let puzzles = [];
puzzles.push(rowsPuzzle, columnsPuzzle, rightDiagPuzzle, leftDiagPuzzle);

let puzzleNames = ["Rows", "Columns", "Right Diagonal", "Left Diagonal"];

let totalMatches = 0;

for (i=0; i<puzzles.length; i++) {
    // console.log("Puzzle: ", puzzleNames[i]);
    // console.table(puzzles[i]);
    
    for (const row of puzzles[i]) {
        totalMatches += checkRow(row);
    }
}


console.log("Total matches: ", totalMatches);

function checkRow(row) {
    let matches = 0;
    let forwardMatches = row.match(xmas1);
    let backwardMatches = row.match(xmas2);

    matches += (forwardMatches? forwardMatches.length : 0) + (backwardMatches ? backwardMatches.length : 0);

    // console.log(forwardMatches,backwardMatches);
    // console.log(matches);

    return matches;
}

function createColumnsPuzzle(puzzle) {
    let newPuzzle = [];

    for (const row of puzzle) {
        for (let i = 0; i < row.length; i++) {
            if (newPuzzle[i] === undefined) {
                newPuzzle[i] = "";
            }
            newPuzzle[i] += row[i];
        }
    }

    return newPuzzle;
}

function createRightDiagPuzzle(puzzle) {
    let newPuzzle1 = [];
    let newPuzzle2 = [];
    let rowLength = puzzle[0].length;
    let rows = puzzle.length;

    // shift the columns over by their index
    for (let i=0; i<rowLength; i++) {
        newPuzzle1[i] = puzzle[i].slice(i);
        newPuzzle2[i] = puzzle[i].slice(0,i).split('').reverse().join('');
    }

    newPuzzle1 = createColumnsPuzzle(newPuzzle1);
    newPuzzle2 = createColumnsPuzzle(newPuzzle2);

    return newPuzzle1.concat(newPuzzle2);
}

function createLeftDiagPuzzle(puzzle) {
    let newPuzzle1 = [];
    let newPuzzle2 = [];
    let rowLength = puzzle[0].length;
    let rows = puzzle.length;

    // shift the columns over by their index
    for (let i=0; i<rowLength; i++) {
        newPuzzle1[i] = puzzle[i].slice(-1-i);
        newPuzzle2[i] = puzzle[i].slice(0,-1-i).split('').reverse().join('');
    }

    newPuzzle1 = createColumnsPuzzle(newPuzzle1);
    newPuzzle2 = createColumnsPuzzle(newPuzzle2);

    return newPuzzle1.concat(newPuzzle2);
}