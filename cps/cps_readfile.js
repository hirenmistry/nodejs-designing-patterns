//this is another example for CPS with read file
function readFiles(files, cb) {
    if (files.length) {
        cb(null, files);
    } else {
        cb('no files supplied');
    }
}
// As per the patterns for the JS if we need to make callback enable function with errors 
// then we should pass error object as first param and after that the response pattern
readFiles(process.argv.slice(2), function(err, data) {
    if (err) return console.error(err);
    console.log(data);
  });