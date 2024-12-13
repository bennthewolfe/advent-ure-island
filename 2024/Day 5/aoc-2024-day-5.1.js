// Run with node --inspect [filename] to debug
// Run with node --watch index.js to watch for changes and run

fs = require('fs');

const fullData = JSON.parse(fs.readFileSync('source.json', 'utf-8'));

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

for (let update of updates) {
    let result = checkPages(update);

    if (result) {
        let middle = update[Math.floor(update.length / 2)];
        // console.log("Update accepted : ", update, middle);
        middles.push(middle);
    }
}

// console.log(rules, updates, middles);
console.log(middles.reduce((acc, val) => acc + val, 0));

function checkPages(pages) {
    return pages.every((page, index, arr) => {
        return checkPage(page, index, arr);
    });
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