const fs = require('fs');

const fullData = JSON.parse(fs.readFileSync('source.json','utf-8'));
const shortData = fullData[5];

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
    if (index < 14) { continue; }

    const slice = data.slice(index-14,index);
    const replacementString = `[${slice[0]}+].*[${slice[0]}+]|[${slice[1]}+].*[${slice[1]}+]|[${slice[2]}+].*[${slice[2]}+]|[${slice[3]}+].*[${slice[3]}+]|[${slice[4]}+].*[${slice[4]}+]|[${slice[5]}+].*[${slice[5]}+]|[${slice[6]}+].*[${slice[6]}+]|[${slice[7]}+].*[${slice[7]}+]|[${slice[8]}+].*[${slice[8]}+]|[${slice[9]}+].*[${slice[9]}+]|[${slice[10]}+].*[${slice[10]}+]|[${slice[11]}+].*[${slice[11]}+]|[${slice[12]}+].*[${slice[12]}+]|[${slice[13]}+].*[${slice[13]}+]`;
    const re = new RegExp(replacementString,"g");

    if(!slice.match(re)) { uniqueCharPos = index-1; }
}

console.log(uniqueCharPos+1);