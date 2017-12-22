const DB = require('./../config/db-client');
const md5 = require('md5');

module.exports = {
    add : function (req, res, next) {
        let user = {};
        user.password = req.body.pswd ? md5(req.body.pswd) : '';
        user.login = req.body.log ? req.body.log : '';

        DB.query('INSERT INTO users SET ?', user).then(res.end("OK"), next);
    },
    del : function (req, res, next) {
        let userID = req.params.id;

        DB.query('DELETE FROM users WHERE id = ?', userID).then(res.end("OK"), next);
    },
    update : function (req, res, next) {
        let userID = req.params.id;
        let password = req.body.pswd ? md5(req.body.pswd) : '';
        let login = req.body.log ? req.body.log : '';

        DB.query('UPDATE users SET login = ?, password = ? WHERE id = ?', [login, password, userID]).then(res.end("OK"), next);
    },
    get : function (req, res, next) {
        let userID = req.params.id;

        DB.query('SELECT * FROM users WHERE id = ?', userID).spread(rows => rows[0]).then(user => res.json(user), next);
    },
    findById : function (id) {
        return new Promise((resolve, reject) => {
            DB.query('SELECT * FROM users WHERE id = ?', id).spread(rows => rows[0]).then(resolve, reject);
        });
    },
    findByName : function (username) {
        return new Promise((resolve, reject) => {
            DB.query('SELECT * FROM users WHERE login like ?', username).spread(rows => rows[0]).then(resolve, reject);
        });
    }
};
