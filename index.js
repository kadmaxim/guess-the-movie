let express = require('express');
let bodyParser = require('body-parser');
let url = require('url');
const Films = require('./app/films');

const PORT = 3000;

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', PORT);

app.put('/api/film', Films.add);
app.get('/api/film/:id', Films.get);
app.post('/api/film/:id', Films.update);
app.delete('/api/film/:id', Films.del);

app.listen(app.get('port'), function () {
    console.log("Server is running on port " + app.get('port'));
});
