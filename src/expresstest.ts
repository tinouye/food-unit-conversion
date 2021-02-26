const express = require('express')
const path = require('path')
//const bodyParser = require('body-parser');
const conversions = require('./conversions')

const app = express()
const PORT = process.env.PORT || 5000

app.use('/', express.static('static')) //Send website in /static when / is accessed

//Initialize bodyParser to parse body, I guess?
//app.use(bodyParser.json()); // support json encoded bodies, shouldn't need this
app.use(express.urlencoded({ extended: true })); // support encoded bodies

app.post('/convert', (req, res, next) => {
  console.log(req.url)
  // Define conversion object
  interface ConversionRequest {
    val1: number;
    unit1: string;
    unit2: string;
    density: string;
  }

  //Load req body into ConversionRequest schema
  const reqbody: ConversionRequest = {
    val1: req.body.val1,
    unit1: req.body.unit1,
    unit2: req.body.unit2,
    density: req.body.density,
  }
  let output = conversions.makeConversion(reqbody)
  console.log(output)
  res.send(output)
},
(req, res) => {res.send("foo")})

app.listen(PORT, () => {
  console.log(`Example app listening`)
})