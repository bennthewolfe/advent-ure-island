const fs = require('fs');

const fullData = JSON.parse(fs.readFileSync('source.json', 'utf-8'));
const shortData = fullData.slice(0,3);

let data = fullData;

/* Opening Stacks

[P]     [L]         [T]            
[L]     [M] [G]     [G]     [S]    
[M]     [Q] [W]     [H] [R] [G]    
[N]     [F] [M]     [D] [V] [R] [N]
[W]     [G] [Q] [P] [J] [F] [M] [C]
[V] [H] [B] [F] [H] [M] [B] [H] [B]
[B] [Q] [D] [T] [T] [B] [N] [L] [D]
[H] [M] [N] [Z] [M] [C] [M] [P] [P]
 1   2   3   4   5   6   7   8   9 
*/

const stacksDictionary = '0PLMNWVBHHQMLMQFGBDNGWMQFTZPHTMTGHDJMBCRVFBNMSGRMHLPNCBDP';

/* Plan
- (encode origninal stacks into arrays) Not going to do that
- * map data into usable procedure with split() -  regex
- * run procedure using splice
- * solution is to pop the ends of the arrays
- * create lookup dictionary

*/
let initialInventory = [...Array(57).keys()];
initialInventory.shift();

let stacks = [
    [],
    initialInventory.slice(0, 8).reverse(),
    initialInventory.slice(8, 11).reverse(),
    initialInventory.slice(11, 19).reverse(),
    initialInventory.slice(19, 26).reverse(),
    initialInventory.slice(26, 30).reverse(),
    initialInventory.slice(30, 38).reverse(),
    initialInventory.slice(38, 44).reverse(),
    initialInventory.slice(44, 51).reverse(),
    initialInventory.slice(51, 56).reverse()
];

console.table(stacks);

data = data.map(el => {
    let found = el.match(/move (\d+) from (\d+) to (\d+)/);

    let howMany = Number(found[1]);
    let source = Number(found[2]);
    let destination = Number(found[3]);

    // run procedure
    /* for (let index = 0; index < howMany; index++) {
        stacks[destination].push(stacks[source].pop());
    } */
    stacks[destination].push(...stacks[source].splice(howMany*-1,howMany));

    return [howMany, source, destination];
});

//console.table(data);
console.table(stacks);

console.log(
    [
        crateLookup(stacks[1].pop()),
        crateLookup(stacks[2].pop()),
        crateLookup(stacks[3].pop()),
        crateLookup(stacks[4].pop()),
        crateLookup(stacks[5].pop()),
        crateLookup(stacks[6].pop()),
        crateLookup(stacks[7].pop()),
        crateLookup(stacks[8].pop()),
        crateLookup(stacks[9].pop())
    ].join('')
);

function crateLookup(id) {
    return stacksDictionary[id];
}