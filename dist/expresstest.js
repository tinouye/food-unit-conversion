const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
/*
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'))
})
*/
app.use('/', express.static('website'));
/*
app.post('/', (req, res) => {
  res.send('post')
})
*/
app.get('/foo', (req, res) => {
    res.send('foo');
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
