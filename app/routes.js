const Films = require('./models/films');
const Gamers = require('./models/gamers');
const Users = require('./models/users');
const Admin = require('./models/admin');

const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

module.exports = function (app, passport) {
    app.post('/api/film', ensureLoggedIn('/admin/login'), Films.add);
    app.get('/api/film/:id', Films.get);
    app.post('/api/film/:id', ensureLoggedIn('/admin/login'), Films.update);
    app.delete('/api/film/:id', ensureLoggedIn('/admin/login'), Films.del);

    app.get('/api/films', Films.getAll);
    
    app.post('/api/gamer', Gamers.add);
    app.get('/api/gamers', Gamers.getAll);

    app.put('/api/user', Users.add);
    app.get('/api/user/:id', Users.get);
    app.post('/api/user/:id', Users.update);
    app.delete('/api/user/:id', Users.del);
	
    app.get('/admin', Admin.home);
    app.get('/admin/login', Admin.login);
    app.post('/admin/login', passport.authenticate('local', { failureRedirect : '/admin/login' }), Admin.auth);
    app.get('/admin/profile', ensureLoggedIn('/admin/login'), Admin.profile);
    app.get('/logout', ensureLoggedIn('/admin/login'), Admin.logout);
    app.get('/admin/add-films', ensureLoggedIn('/admin/login'), Admin.addfilms);
    app.get('/admin/films', Admin.films);
};
