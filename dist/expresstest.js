const express = require('express');
const path = require('path');
//const bodyParser = require('body-parser');
const conversions = require('./conversions');
const app = express();
const PORT = process.env.PORT || 5000;
let client = "client/build";
console.log(process.argv);
if (process.argv.length == 3 && process.argv[2] == "test") {
    client = "static";
}
app.use('/', express.static(client)); //Send website in directory when / is accessed
//Initialize bodyParser to parse body, I guess?
app.use(express.urlencoded({ extended: true })); // support encoded bodies
app.post('/convert', (req, res, next) => {
    console.log(req.url);
    //Load req body into ConversionRequest schema
    const reqbody = {
        val1: req.body.val1,
        unit1: req.body.unit1,
        unit2: req.body.unit2,
        density: req.body.density,
    };
    let output = conversions.makeConversion(reqbody);
    console.log(output);
    res.send(output);
}, (req, res) => { res.send("foo"); });
app.listen(PORT, () => {
    console.log(`Example app listening`);
});
