var EventEmitter = require('events');
const path = require('path');
// Give a list of files all of them which match an extension
function findFiles(files, extension) {
    const emitter = new EventEmitter();

    if (files.length === 0) {
        // yield an error
        emitter.emit('error', 'no files supplied');
    }

    // Check for matches
    function checkFiles() {
        files.forEach(file => {
            if (path.extname(file) === extension) {
                // yield a result
                emitter.emit('match', file);
                return;
            }
        });
    }

    // Ask the event loop to loop through our loop ...
    process.nextTick(checkFiles);

    // For chainability on on()
    return emitter;
}

try {
    findFiles(process.argv.slice(3), process.argv[2])
        .on('match', file => console.log(file + ' is a match')) // when matched 
        .on('error', err => console.log('Error emitted: ' + err.message)); // when error emitted    
} catch (error) {
    console.error(error.message);
}