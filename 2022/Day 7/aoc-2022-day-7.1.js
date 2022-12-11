const fs = require('fs');

const fullData = JSON.parse(fs.readFileSync('source.json', 'utf-8'));
const shortData = fullData.slice(0, 50);

let data = fullData;

//console.table(data);

/*  Plan
- * Determine commands from output
- Group outputs togther (? maybe not even a good idea)
- * Establish ```pwd``` for each command and output
- * Get file sizes
- Build a directory tree
- Build a directory path for each file
- Tabulate summed sizes for directories
- Sum all 100M+ directories

Ideas
- maybe change the names of files to their absolute path from root (?)
    - I think this might be useful in cases when I have a file named the same thing in multiple dirs (I don't think Eric would do that to us, but I can't be sure)
- Skip $ ls, because of pwd, I don't care about ls, there is no other way to print files
*/

// pwd (print working directory)
// directory before command is executed executed as an array here
let pwd = ['/'];

let dirs = [];
dirs['/'] = ['/',['/'],0];
let files = [];

let parsedData = data.map((el, index) => {
    const originalIndex = index;
    let curPwd = pwd;
    let fileSize = 0;
    let fileName = '';

    // split
    const splitEl = el.split(' ');

    // determine command or output
    const type = splitEl[0] === '$' ? 'command' : 'output';

    // procedure
    if (type === 'command') {
        if (splitEl[1] === 'cd') {
            if (splitEl[2] === '/') {
                // $ cd /
                pwd = ['/'];

            } else if (splitEl[2] === '..') {
                // $ cd ..
                if (pwd[1] === undefined) {
                    // cd .. in / should give you root
                    pwd = ['/'];
                } else {
                    pwd.pop();
                }

            } else {
                // $ cd X
                pwd.push(splitEl[2]);

            }

        }
        // else $ ls --- ignore

    } else {
        // type output
        if (splitEl[0] === 'dir') {
            dirParse(splitEl[1], curPwd);

        } else {
            // is file
            fileName = splitEl[1];
            fileSize = splitEl[0];

            fileParse(fileName,Number(fileSize),curPwd.join('/'));
        }
    }

    return [el, originalIndex, type, curPwd.join('/'), fileName, fileSize];
});

function dirParse(dirName, directoryPath) {
    /* Dirs
    {
        absolutePath : [dirName, dirPath, dirSizeSum],
        absolutePath1 : ...
    }
    */
    let dirPathCopy = directoryPath.map((el) => el);
    dirPathCopy.push(dirName);
    dirPathString = dirPathCopy.join('/');

    // is new dir?
    if (dirs[dirPathString] === undefined) {
        dirs[dirPathString] = [dirName, dirPathCopy, 0];
    }
}

function fileParse(fileName,fileSize,dirPathString) {
    let dirPath = dirPathString === '/' ? [] : dirPathString.slice(2).split('/');
    // returns original root
    dirPath.unshift('/');

    let absoluteFileName = dirPathString + '/' + fileName;

    if (files[absoluteFileName] === undefined) {
        files[absoluteFileName] = [fileName,fileSize,dirPathString];

        dirPath.forEach((dir,index) => {
            let dirSegment = dirPath.slice(0,index+1).join('/');
            dirs[dirSegment][2] = Number(dirs[dirSegment][2]) + Number(fileSize);
        });
    }

    
}

//console.table(parsedData);
console.table(dirs);
//console.table(files);

let totalSize = 0;

for (const id in dirs) {
    if (dirs[id][2] <= 100_000) {
        totalSize += dirs[id][2];
    }
};

console.log(totalSize);