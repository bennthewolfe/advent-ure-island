const fs = require('fs');

const fullData = JSON.parse(fs.readFileSync('source.json','utf-8'));
const shortData = fullData.slice(0,10);

const data = fullData;

//console.table(data);

let xpos = 0;
let ypos = 0;
let aim = 0;

data.forEach(el => {
    let parts = el.split(' ');
    let dist = Number(parts[1]);
    
    switch (parts[0]) {
        case 'forward':
            xpos += dist;
            ypos += dist * aim;
            break;
        case 'up':
            aim -= dist;
            break;
        case 'down':
            aim += dist;
            break;
    }
});

console.log(xpos, ypos, xpos*ypos);