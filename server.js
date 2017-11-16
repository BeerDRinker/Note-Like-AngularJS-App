const express = require('express');
const bodyParser = require('body-parser');
const loging = require('morgan');
const fs = require('fs');

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(loging('dev'));

app.use(express.static(__dirname + '/app'));

const ninjas = fs.readFileSync(__dirname + '/server/ninjas.json');

app.get('/ninjasJSON', (req, res) => {
    res.send(ninjas).status(200);
})

app.listen(port, () => {
    console.log(`server is up on port: ${port}`);
});