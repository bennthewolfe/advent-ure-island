// Run with node --inspect [filename] to debug
// Run with node --watch index.js to watch for changes and run

const { create } = require('domain');

fs = require('fs');

const fullData = JSON.parse(fs.readFileSync('source.json','utf-8'));
const shortData = fullData.slice(0,10);

// Uncomment the fullData overwrite to run against the full dataset
let data = shortData;
data = fullData;

//  { "(posX,posY of A)" = [left letter match, right letter match] }
let possibleMatches = {};
let matches = 0;

// run through data looking for matches
for (let i=0; i<data.length; i++) {
    for (let c=0; c<data[i].length; c++) {
        switch (data[i][c]) {
            case 'S':
            case 'M':
                // Bust possible match on this character
                bustPossibleMatch(`(${c},${i})`);

                // look to see if it's completing a possible match
                if (possibleMatches[`(${c+1},${i-1})`] !== undefined) {
                    let pairchecker = [];
                    // add this character to the pairchecker
                    pairchecker[data[i][c]] = true;
                    // add stashed NE to the pairchecker
                    pairchecker[possibleMatches[`(${c+1},${i-1})`][1]] = true;
                    
                    // check SW -> NE
                    if (Object.keys(pairchecker).length === 2) {
                        // good match
                        pairchecker = [];
                        // add look back character to pairchecker (NW)
                        pairchecker[possibleMatches[`(${c+1},${i-1})`][0]] = true;
                        // add look ahead character to pairchecker (SE)
                        if (data[i][c+2] === 'M' || data[i][c+2] === 'S') {
                            pairchecker[data[i][c+2]] = true;
                        }

                        // check NW -> SE
                        if (Object.keys(pairchecker).length === 2) {
                            // good match
                            // console.log(`Match found at (${c+1},${i-1})`);
                            matches++;
                        } else {
                            // NW -> SE didn't match
                            bustPossibleMatch(`(${c+1},${i-1})`);
                        }
                    } else {
                        // SW -> NE didn't match
                        bustPossibleMatch(`(${c+1},${i-1})`);
                    }
                } else {
                    // no expected match
                    bustPossibleMatch(`(${c+1},${i-1})`);
                }

                // look ahead to see if it's starting a possible match
                if (data[i][c+2] === 'M' || data[i][c+2] === 'S') {
                    // add to possible matches
                    possibleMatches[`(${c+1},${i+1})`] = [data[i][c],data[i][c+2]];

                    // console.log(`Possible match at (${c+1},${i+1})`);
                }

                break;
            case 'A':
                // Look behind for possible match
                if (possibleMatches[`(${c},${i})`] !== undefined) {
                    continue;
                }
                break;
            default:
                // look for possible match and bust it
                bustPossibleMatch(`(${c},${i})`);
                break;
        }
    }
}

console.log(`Matches: ${matches}`);

function bustPossibleMatch(pos) {
    delete possibleMatches[pos];
    // console.log(`Busted possible match at ${pos}`);
}
