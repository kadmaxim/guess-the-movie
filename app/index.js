const express = require('express');
const bodyParser = require('body-parser');
const url = require('url');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');

const PORT = 3000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.static('dist'));

app.set('port', PORT);
app.use(session({
    secret : 'guess-the-movie',
    resave : false,
    saveUninitialized : true,
    cookie : { maxAge : 60000 * 12 }
}));

app.set('views', 'public/admin');
app.set('view engine', 'ejs');

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport); // pass passport for configuration
require('./routes')(app, passport);

app.listen(app.get('port'), function () {
    console.log(`Server is running on port ${app.get('port')}`);
});
