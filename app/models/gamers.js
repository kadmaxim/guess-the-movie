const DB = require('./../config/db-client');

module.exports = {
    add : function (req, res, next) {
        let gamer = req.body;

        DB.query('INSERT INTO gamers SET ?', gamer).then(res.end("OK"), next);
    },
    getAll : function (req, res) {
        DB.query('SELECT * FROM gamers ORDER BY score DESC').spread(gamers => res.json(gamers));
    }
};
