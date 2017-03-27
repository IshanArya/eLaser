var wolfram = require('wolfram').createClient('6UPQG9-JWXJ5VR3X3');

wolfram.query('integrate 2x', (err, result) => {
    if (err) throw err;
    console.log(JSON.stringify(result));
});
