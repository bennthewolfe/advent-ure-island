const fs = require('fs');

const fullData = JSON.parse(fs.readFileSync('source.json', 'utf-8'));
const shortData = fullData.slice(0, 20);

let data = fullData;

//console.table(data);

/*  Plan
Q : Do we know the initial size of the bridge?
    A : I suspect that it's 6 slots wide and an undefined length, but I'm not going to assume.
Q : If not, how are we going to keep track of the positions?
    A : I am going to try a coordinate plane system

Strat
- * Establish coordinate plane
- Log whether a head visits, and whether a tail visits
- This would be really cool to watch animated in angular (maybe another time)
- Motion should be modeled by rules.  I think we can trigger the tail movements 
  using pythagorean theorem (but we'll see if that's necessary)
**/

/* coorPlane[string '0,0'] = [int xCoor,int yCoor,bool headVisted,bool tailVisited] */
let coorPlane = {};
coorPlane['0,0'] = [0, 0, true, true];

// ['name', xPos, yPos]
let headPos = ['0,0', 0, 0];
let tailPos = ['0,0', 0, 0];

// Model Knot Movement
data.forEach((el, index) => {
    el = el.split(' ');
    dir = el[0];
    dist = el[1];

    for (let i = 0; i < dist; i++) {
        moveHead(dir);
    }
});

function moveHead(dir) {
    curHead = [headPos[1], headPos[2]];

    // options U, R, D, L
    switch (dir) {
        case 'U':
            headPos[2]++;
            break;
        case 'R':
            headPos[1]++;
            break;
        case 'D':
            headPos[2]--
            break;
        case 'L':
            headPos[1]--;
            break;
        default:
            console.log('error');
            break;
    }

    const name = createName(headPos[1], headPos[2])

    headPos[0] = name;

    // create position will check if exists
    createPosition(headPos[1], headPos[2]);

    // log visit
    coorPlane[name][2] = true;

    // determine move needed
    if (Math.abs(headPos[1] - tailPos[1]) > 1 || Math.abs(headPos[2] - tailPos[2]) > 1) {
        moveTail(curHead);
    }
}

function moveTail(prevHeadPos) {
    const name = createName(prevHeadPos[0], prevHeadPos[1]);
    tailPos = [name, Number(prevHeadPos[0]), Number(prevHeadPos[1])];

    // log visit
    coorPlane[name][3] = true;
}

function createPosition(x, y) {
    const name = createName(x, y);
    if (coorPlane[name] === undefined) {
        Object.defineProperty(coorPlane,String(name),{
            enumerable : true,
            value : [x, y, false, false]
        });
    }
}

function createName(x, y) {
    return x + ',' + y;
}

//console.table(coorPlane);

const filtered = [];
Object.keys(coorPlane).forEach((el) => {
    coorPlane[el][3] === true ? filtered.push(coorPlane[el]) : '';
});

console.table(filtered.length);