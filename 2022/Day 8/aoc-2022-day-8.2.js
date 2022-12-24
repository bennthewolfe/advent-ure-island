const fs = require('fs');

const fullTestData = JSON.parse(fs.readFileSync('source2.json', 'utf-8'));
const fullData = JSON.parse(fs.readFileSync('source.json', 'utf-8'));
const shortData = fullData.slice(0, 5).map((el, index) => el.slice(0, 5));

let data = fullData;

let rowGrid = data;
let columnGrid = [];
let treesDictionary = [];

//console.table(data);

/* Thoughts
- it would be cool to have the reverse of this, a rows array and a columns array (? maybe)
- figure out how many visible trees per row to start
- there are probably mathmatical relationships between the rows and columns
    - if I renumber them 1 - 99^2
    - el[0][2] is in column with el[1][2]
    - or id = 2 is in column with id = 2 + 99*Row and in row with id = 0 through id = Floor(2/99)*99
- characteristics of visibility
    - 0 guarantees visibility of the next
- figure out what makes a tree invisible, as a stopper
    - 9 stops visibility
- RISK : I'll have to make sure not to double count rows / columns
- PROBLEM : How to make sure I'm only counting each tree once
- IDEA : change number base to curTree, if previous number === previous number nothing is over cur in any digit
    - eg : curTree = 7, previous trees [12386] -> converts to base 7 [12416]; <> so not visible in that direction
*/
/* Plan v 2
- * Renumber the trees as unique identifiers
- * Build a column grid
- * establish visibility in treesDictionary
    - just one visible direction is enough
- build a new tree dictionary with the scenic score
*/

data = data.map((el, index) => {
    let rows = el.length;
    let leftVisible = 0;
    let upVisible = 0;
    let rightVisible = 0;
    let downVisible = 0;

    for (let i = 0; i < rows; i++) {
        const thisTree = el.charAt(i);
        let visibility = false;

        // Creates column grid
        // Caution : make sure this isn't numerical addition
        columnGrid[i] = columnGrid[i] === undefined ? thisTree : columnGrid[i] + thisTree;

        // checks is outside
        if (index === 0 || index === (rows - 1)) {
            // first row or last row
            visibility = true;
        } else if (i === 0 || i === (rows - 1)) {
            // first column or last column
            visibility = true;
        } else {
            // is internal tree in all directions

            // able to check left, right, and up -- down will take a new pass because that part of the column array isn't built, yet.
            if (checkVisibility(thisTree, el.slice(0, i))) {
                // checks left
                leftVisible++;
                visibility = true;
            } else if (checkVisibility(thisTree, el.slice(i+1))) {
                // checks right
                rightVisible++;
                visibility = true;
            } else if (checkVisibility(thisTree, columnGrid[i].slice(0, index))) {
                // checks up
                upVisible++
                visibility = true;
            }
        }

        // creates treesDictionary
        treesDictionary[i + Number(index) * (rows)] = [thisTree, visibility];
    }

    return [el, rows, leftVisible];
});

columnGrid.forEach((el, index) => {
    let columns = el.length;

    for (let i = 0; i < columns; i++) {
        const thisTree = el.charAt(i);

        // find absolute index
        // columnIndex + char() * columns
        /*
        0,columns+0,columns*2+0,...,columns*columns+0
        */
        let absoluteIndex = index + (columns * i);

        // check treesDictionary

        if (treesDictionary[absoluteIndex] === true) { continue; }

        // if not already visible, check down

        if (checkVisibility(thisTree, el.slice(i+1))) {
            // checks down
            treesDictionary[absoluteIndex][1] = true;
        }

    }
});

let scenicViews = []

scenicViews = treesDictionary.map((el,index) => {
    // sets initial value -- be careful with zero since we will be doing multiplication
    let scenicCalc = 0;

    // rows
    // remember that this array is square so I can use rows as columns as well
    let rows = data.length;

    let rowsIndex = Math.floor(index/rows);
    let columnsIndex = index%rows;

    let leftView = data[rowsIndex][0].slice(0,index%rows);
    let rightView = data[rowsIndex][0].slice(index%rows + 1);
    let upView = columnGrid[columnsIndex].slice(0,rowsIndex);
    let downView = columnGrid[columnsIndex].slice(rowsIndex+1);

    let leftScenic = checkScenic(el[0],leftView,"left");
    let rightScenic = checkScenic(el[0],rightView);
    let upScenic = checkScenic(el[0],upView,"left");
    let downScenic = checkScenic(el[0],downView);

    scenicCalc = leftScenic;
    scenicCalc *= rightScenic;
    scenicCalc *= upScenic;
    scenicCalc *= downScenic;
    
    return [Number(el[0]),upView.split('').reverse().join(''),rightView,downView,leftView.split('').reverse().join(''),scenicCalc];
});

// console.log('row grid');
// console.table(data);
// console.log('column grid');
// console.table(columnGrid);
// console.log('tree dictionary');
// console.table(treesDictionary);
// console.log('Scenic Views');
// console.table(scenicViews);

function checkVisibility(testTree, comparisonTrees) {
    testTree = Number(testTree);

    // handles testTree <= 1 because Radix can't be <= 1
    if (testTree === 0) {
        return false;
    } else if (testTree === 1) {
        // '000000' some amount of zeroes is the only way this is visible
        if (Number(comparisonTrees) === 0) { return true; } else { return false; }
    }

    /*
    3, 11012220 => true
    3, 11032220 => false
    each digit is less than test (could use while, but I want to be clever -- failed so far)

    string.find(range(3-9))
    string.match(/[3456789]/)
    */

    let failDigits = '0123456789';
    failDigits = failDigits.slice(failDigits.indexOf(testTree));
    const replacementString = `[${failDigits}]`;
    const re = new RegExp(replacementString,"g");

    if (!comparisonTrees.match(re)) { return true; }


    return false;
}

function checkScenic (testTree, comparisonTrees,dir="right") {
    testTree = Number(testTree);

    // reverse string
    if (dir === "left") {
        comparisonTrees = comparisonTrees.split('').reverse().join('');
    }

    if (comparisonTrees === '') {
        return 0
    }

    let failDigits = '0123456789';
    failDigits = failDigits.slice(failDigits.indexOf(testTree));

    const replacementString = `[${failDigits}]`;

    const re = new RegExp(replacementString,"g");
    const match = comparisonTrees.match(re);

    if (match) {
        let length = comparisonTrees.indexOf(match[0]);

        if (Number(match[0]) >= testTree) { length++; }

        return length;
    }

    return comparisonTrees.length;
}

console.log(scenicViews.sort((a,b) => b[5] - a[5]).slice(0,20));