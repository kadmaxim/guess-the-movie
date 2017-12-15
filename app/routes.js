const Films = require('./models/films');
const Users = require('./models/users');

module.exports = function (app, passport) {
    app.put('/api/film', Films.add);
	app.get('/api/film', Films.getall);
    app.get('/api/film/:id', Films.get);
    app.post('/api/film/:id', Films.update);
    app.delete('/api/film/:id', Films.del);

    app.put('/api/user', Users.add);
    app.get('/api/user/:id', Users.get);
    app.post('/api/user/:id', Users.update);
    app.delete('/api/user/:id', Users.del);
    
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
};
