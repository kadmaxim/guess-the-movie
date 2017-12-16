const Films = require('./models/films');
const Users = require('./models/users');
const Admin = require('./models/admin');

module.exports = function (app, passport) {
    app.put('/api/film', Films.add);
    app.get('/api/film/:id', Films.get);
    app.post('/api/film/:id', Films.update);
    app.delete('/api/film/:id', Films.del);

    app.get('/api/films', Films.getAll);

    app.put('/api/user', Users.add);
    app.get('/api/user/:id', Users.get);
    app.post('/api/user/:id', Users.update);
    app.delete('/api/user/:id', Users.del);
	
    app.get('/admin', Admin.home);
    app.get('/admin/login', Admin.login);
    app.post('/admin/login', passport.authenticate('local', { failureRedirect : '/admin/login' }), Admin.auth);
    app.get('/admin/profile', require('connect-ensure-login').ensureLoggedIn('/admin/login'), Admin.profile);
    app.get('/logout', Admin.logout);
};
