// Dependencies
const EventEmitter = require('events').EventEmitter;
const path = require('path');
const fs = require('fs');

if (process.argv.length <= 3) {
    console.log("Usage: " + __filename + " .ext [path/to/directory/file.ext ...]");
    process.exit(-1);
}

// Definition
function findFiles(dir, extension, cb = null) {
    const emitter = new EventEmitter();
    const errorMessage = 'no files or dir supplied';

    if (!fs.existsSync(dir) || !fs.lstatSync(dir).isDirectory()) {
        if (cb) cb(errorMessage);
        emitter.emit('error', errorMessage);
    }

    function filter_files() {
        fs.readdir(dir, function (err, items) {
            let result = [];
            items.forEach(file => {
                if (path.extname(file) === extension) {
                    if (!!cb) {
                        result.push(file);
                    }
                    // yield a result
                    emitter.emit('match', file);
                }
            });
            if (!!cb) {
                cb(null, result);
            }
        });
    }
    process.nextTick(filter_files);
    return emitter;
}

try {
    // Implementation with a callback
    findFiles(process.argv[3], process.argv[2], (err, result) => {
        if (err) return console.error(err);
        console.log(`All in one: ${result}`);
    });

    // Implementation with an event emitter
    findFiles(process.argv[3], process.argv[2])
        .on('match', file => console.log(file + ' is a match'))
        .on('error', err => console.log('Error emitted: ' + err.message));
} catch (error) {
    console.error(error.message);
}