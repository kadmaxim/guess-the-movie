const DB = require('./../config/db-client');

module.exports = {
    add : function (req, res, next) {
        let film = req.body;

        DB.query('INSERT INTO movies SET ?', film).then(res.end("OK"), next);
    },
    del : function (req, res, next) {
        let filmID = req.params.id;

        DB.query('DELETE FROM movies WHERE id = ?', filmID).then(res.end("OK"), next);
    },
    update : function (req, res, next) {
        let filmID = req.params.id;
        let title = req.body.title ? req.body.title : '';
        let img = req.body.img ? req.body.img : '';

        DB.query('UPDATE movies SET title = ?, img = ? WHERE id = ?', [title, img, filmID]).then(res.end("OK"), next);
    },
    get : function (req, res, next) {
        let filmID = req.params.id;
        DB.query('SELECT * FROM movies WHERE id = ?', filmID).spread(rows => rows[0]).then(film => res.json(film), next);
    },
    loadAll : function () {
        return new Promise((resolve, reject) => {
            DB.query('SELECT * FROM movies').spread(films => films).then(resolve, reject);
        });
    },
    getAll : function (req, res) {
        DB.query('SELECT * FROM movies').spread(films => res.json(films));
    }
};
