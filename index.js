const express = require('express');
const bodyParser = require('body-parser');
const url = require('url');
const session = require('express-session');
const passport = require('passport');

const Films = require('./app/films');
const Users = require('./app/users');

const PORT = 3000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.set('port', PORT);
app.use(session({
    secret : 'guess-the-movie',
    resave : false,
    saveUninitialized : true,
    cookie : { maxAge : 60000 * 12 }
}));

app.set('views', 'views');
app.set('view engine', 'ejs');

require('./config/passport')(passport); // pass passport for configuration
app.use(passport.initialize());
app.use(passport.session());

app.use(require('cookie-parser')());

app.put('/api/film', Films.add);
app.get('/api/film/:id', Films.get);
app.post('/api/film/:id', Films.update);
app.delete('/api/film/:id', Films.del);

app.put('/api/user', Users.add);
app.get('/api/user/:id', Users.get);
app.post('/api/user/:id', Users.update);
app.delete('/api/user/:id', Users.del);

// Define routes.
app.get('/', function (req, res) {
    res.render('home', { user : req.user });
});

app.get('/login', function (req, res) {
    res.render('login');
});

app.post('/login', passport.authenticate('local', { failureRedirect : '/login' }), function (req, res) {
    console.log("logged in");
    res.redirect('/');
});

app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

app.get('/profile', require('connect-ensure-login').ensureLoggedIn(), function (req, res) {
    res.render('profile', { user : req.user });
});

app.listen(app.get('port'), function () {
    console.log("Server is running on port " + app.get('port'));
});
