const express = require('express');
const path = require('path');
//const bodyParser = require('body-parser');
const conversions = require('./conversions');
const unitsRouter = require('./units');
const ingredientsRouter = require('./ingredients');
const app = express();
const PORT = process.env.PORT || 80;
let client = path.join(__dirname, "..", "client", "build");
console.log("Delivering page from: " + client + " on port " + PORT);
app.use('/', express.static(client)); //Send website in directory when / is accessed
//Initialize bodyParser to parse body, I guess?
app.use(express.urlencoded({ extended: true })); // support encoded bodies
app.use('/units', unitsRouter);
app.use('/ingredients', ingredientsRouter);
app.post('/convert', (req, res, next) => {
    //Load req body into ConversionRequest schema
    const reqbody = {
        val1: req.body.val1,
        unit1: req.body.unit1,
        unit2: req.body.unit2,
        density: req.body.ingredient,
    };
    let output = conversions.makeConversion(reqbody);
    console.log(output);
    res.send(output);
}, (req, res) => { res.send("foo"); });
app.listen(PORT, () => {
    console.log(`Example app listening`);
});
