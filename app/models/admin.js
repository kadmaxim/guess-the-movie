const Films = require('./films');

module.exports = {
    home : function (req, res) {
        res.render('home', { user : req.user });
    },
    login : function (req, res) {
        res.render('login');
    },
    auth : function (req, res) {
        console.log("logged in");
        res.redirect('/admin');
    },
    logout : function (req, res) {
        req.logout();
        res.redirect('/admin');
    },
    profile : function (req, res) {
        res.render('profile', { user : req.user });
    },
    addfilms : function (req, res) {
        res.render('add_films');
    },
    films : function (req, res) {
        Films.loadAll().then(function(data){
            res.render('all_films', { films : data });
        });
    }
};
