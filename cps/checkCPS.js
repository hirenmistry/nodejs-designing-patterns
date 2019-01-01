// Going to call the Continuation-passing style pattern (CPS)
// Synchronous
function add(a, b) {
    return a + b;
}

console.log(add(2, 2));

// Asynchronous
function addAsync(a, b, cb) {
    cb(a + b);
}

addAsync(2, 4, function add(result) {
    console.log(result);
});

//For aesthetics, you can re-factor the last function as:
addAsync(5,10, result => console.log(result));

//this can be call following way also
addAsync(2,4,console.log);

//console.log('hello');