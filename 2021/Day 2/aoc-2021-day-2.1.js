const fs = require('fs');

const fullData = JSON.parse(fs.readFileSync('source.json','utf-8'));
const shortData = fullData.slice(0,10);

const data = fullData;

//console.table(data);

let xpos = 0;
let ypos = 0;

data.forEach(el => {
    let parts = el.split(' ');
    
    switch (parts[0]) {
        case 'forward':
            xpos += Number(parts[1]);
            break;
        case 'up':
            ypos -= Number(parts[1]);
            break;
        case 'down':
            ypos += Number(parts[1]);
            break;
    }
});

console.log(xpos, ypos, xpos*ypos);