// Run with node --inspect [filename] to debug
// Run with node --watch index.js to watch for changes and run

fs = require('fs');

const fullData = JSON.parse(fs.readFileSync('source2.json', 'utf-8'));

data = fullData;

const rawRules = data.rules;
const updates = data.updates;

/*
Turn them into the following
{
    page : [other pages, ...]
}
*/
let rules = {};
for (let rule of rawRules) {
    rule = rule.split('|');

    if (rules[rule[0]] === undefined) {
        rules[rule[0]] = [parseInt(rule[1])];
    } else {
        // I should determine if this is a duplicate, but I bet it's not
        rules[rule[0]].push(parseInt(rule[1]));
    }
}

let middles = [];
let failures = [];
// pageToFix is [true, index (optional), requiredPage(optional)];
let pageToFix = [false];
let failureIndex = 0;

// Run through updates and find failures
for (let update of updates) {
    let result = checkPages(update);

    if (result) {
        let middle = update[Math.floor(update.length / 2)];
        // console.log("Update accepted : ", update, middle);
        // middles.push(middle);
    } else {
        failures.push(update);
    }
}

console.log("Rules : ");
console.log(rules);
console.log("Initial Failures : ");
console.table(failures);

// Run through failures, fix them, and find middles
for (let f=0; f < failures.length; f++) {
    let failure = failures[f];
    failureIndex = f;

    let result = checkAndFixPages(failure);

    if (result) {
        let middle = failure[Math.floor(failure.length / 2)];
        // console.log("Update accepted : ", update, middle);
        middles.push(middle);
    }
}

console.log("Corrected Failures : ");
console.table(failures);
// console.log("Middles : ");
// console.log(middles);

// console.log("Sum of Middles : ", middles.reduce((acc, val) => acc + val, 0));

function checkPages(pages) {
    return pages.every((page, index, arr) => {
        return checkPage(page, index, arr);
    });
}

function checkAndFixPages(pages) {
    let result = false;

    do {
        result = fixPages(pages);
        pages = failures[failureIndex];
    } while (result!==true)

    return true;
}

function checkPage(page, index, pages) {
    if (rules[page] === undefined) {
        // No rules for this page
        return true;
    } else {
        // There are rules for this page
        return rules[page].every((requiredPage) => {
            let requiredPageIndex = pages.indexOf(requiredPage);
            if (requiredPageIndex >= 0) {
                // the other page exists in this update
                if (requiredPageIndex > index) {
                    // the other page is before this page
                    return true;
                } else {
                    // rule break
                    // console.log("Rule break: ", pages, page, requiredPage);
                    return false;
                }
            }
            // required page doesn't exist in this update
            return true;
        });
    }
}

function checkAndFixPage(page, index, pages) {
    if (rules[page] === undefined) {
        // No rules for this page
        return true;
    } else {
        // There are rules for this page
        return rules[page].every((requiredPage) => {
            let requiredPageIndex = pages.indexOf(requiredPage);
            if (requiredPageIndex >= 0) {
                // the other page exists in this update
                if (requiredPageIndex > index) {
                    // the other page is before this page
                    return true;
                } else {
                    // rule break
                    console.log("Rule break: ", pages, page, requiredPage);
                    pageToFix = [true, index, requiredPage];
                    return false;
                }
            }
            // required page doesn't exist in this update
            return true;
        });
    }
}

function fixPages(pages) {
    pages.every((page, index, arr) => {
        do {
            if (checkAndFixPage(page, index, arr)) {
                pageToFix = [false];
                return true;
            } else {
                failures[failureIndex] = fixPage();
                return false;
            };
        } while (pageToFix[0]===true);
    });
}

function fixPage() {
    // When we hit a rule break, assess rule, and fix it
    let newUpdate = failures[failureIndex];

    let problemIndex = newUpdate.indexOf(pageToFix[2]);

    // Move problem page to after
    newUpdate.splice(problemIndex,1);
    newUpdate.splice(pageToFix[1],0,pageToFix[2]);

    return newUpdate;
}