const DB = require('./db-client');
const Response = require('./response');

function check(err, conn){
    if (err) throw err;

    conn.end();
}

//https://www.npmjs.com/package/mysql

module.exports = {
    add : function (req, res) {
        let user = req.body;
        let resp = Response.init;
        let connection = DB.connect();

        connection.query('INSERT INTO users SET ?', user, function (errs, results) {
            check(errs, connection);

            if (results.insertId === 0) {
                resp.msg = `User ${user.login} was not added!`;
                console.log(resp.msg);
            } else {
                resp = {
                    "status" : "ok",
                    "msg" : `User ${user.login} was added!`
                };
            }

            res.json(resp);
        });
    },
    del : function (req, res) {
        let userID = req.params.id;
        let resp = Response.init;
        let connection = DB.connect();

        connection.query('DELETE FROM users WHERE id = ?', userID, function (errs, results) {
            check(errs, connection);

            if (results.affectedRows === 0) {
                resp.msg = `User with ID = ${userID} was not deleted!`;
                console.log(resp.msg);
            } else {
                resp = {
                    "status" : "ok",
                    "msg" : `User with ID = ${userID} was deleted!`
                };
            }

            res.json(resp);
        });
    },
    update : function (req, res) {
        let userID = req.params.id;
        let resp = Response.init;
        let connection = DB.connect();

        connection.query('UPDATE users SET login = ?, password = ? WHERE id = ?', [ "login", "title", userID ], function (errs, results) {
            check(errs, connection);

            if (results.affectedRows === 0) {
                resp.msg = `User with ID = ${userID} was not updated!`;
                console.log(resp.msg);
            } else {
                resp = {
                    "status" : "ok",
                    "msg" : `User with ID = ${userID} was updated!`
                };
            }

            res.json(resp);
        });
    },
    get : function (req, res) {
        let userID = req.params.id;
        let resp = Response.init;
        let connection = DB.connect();

        connection.query('SELECT * FROM users WHERE id = ?', userID, function (errs, benutzer) {
            check(errs, connection);

            if (benutzer.length === 0) {
                resp.msg = `User with ID = ${userID} not found!`;
                console.log(resp.msg);
            } else {
                resp = {
                    "status" : "ok",
                    "user" : benutzer[0]
                };
            }

            res.json(resp);
        });
    }
};