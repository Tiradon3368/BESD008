const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const course = require('./course')

// for parsing application/json
app.use(bodyParser.json()); 
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

app.use('/course', course);

app.get('/', function(req, res){
    res.send("Hello world!");
});

app.listen(3000);