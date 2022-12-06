const fs = require('fs');

const fullData = JSON.parse(fs.readFileSync('source.json','utf-8'));
const shortData = fullData[0];

let data = shortData;

console.log(data);

/* Plan
- *Ingest source data
- For loop through string comparing to last four chars
- Output char index

*/

let index = -1;
let uniqueCharPos = 0;

while (uniqueCharPos === 0 && index<data.length) {
    index++;
    if (index < 4) { continue; }

    const slice = data.slice(index-4,index);
    const replacementString = `[${slice[0]}+].*[${slice[0]}+]|[${slice[1]}+].*[${slice[1]}+]|[${slice[2]}+].*[${slice[2]}+]|[${slice[3]}+].*[${slice[3]}+]`;
    const re = new RegExp(replacementString,"g");

    if(!slice.match(re)) { uniqueCharPos = index-1; }
}

console.log(uniqueCharPos+1);