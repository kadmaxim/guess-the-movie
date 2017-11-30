let express = require('express');
let bodyParser = require('body-parser');
let url = require('url');
let db = require('./app/db-client');

const PORT = 3000;

let app = express();

app.set('port', PORT);

function getResponse() {
    return { "status" : "fail" };
}

app.get('/api/users/:name', function (req, res) {
    let username = req.params.name;
    let qResponse = getResponse();
    let connection = db.connect();
    let whereParams = [username];

    connection.query('SELECT score FROM users WHERE name = ?', whereParams, function (err, score) {
        if (err) throw err;

        connection.end();

        res.end("Connected with DB");
    });
});

app.listen(app.get('port'), function () {
    console.log("Server is running on port " + app.get('port'));
});
