var EventEmitter = require('events');
var fs = require('fs');
const path = require('path');

if (process.argv.length <= 3) {
    console.log("Usage: " + __filename + " .ext path/to/directory");
    process.exit(-1);
}

function findFiles(dir, extension) {
    const emitter = new EventEmitter();


    if (!fs.existsSync(dir) || !fs.lstatSync(dir).isDirectory()) {
        emitter.emit('error', 'provided dir name is not an directory.');
    }

    function filter_files() {
        fs.readdir(dir, function (err, items) {
            items.forEach(file => {
                if (path.extname(file) === extension) {
                    // yield a result
                    emitter.emit('match', file);                    
                }
            });
        });
    }
    // Ask the event loop to loop through our loop ...
    process.nextTick(filter_files);

    // For chainability on on()
    return emitter;
}

try {
    findFiles(process.argv[3], process.argv[2])
        .on('match', file => console.log(file + ' is a match')) // when matched 
        .on('error', err => console.log('Error emitted: ' + err.message)); // when error emitted    
} catch (error) {
    console.error(error.message);
}