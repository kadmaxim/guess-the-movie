const DB = require('./../../config/db-client');

function check(err, conn){
    if (err) throw err;

    conn.end();
}

module.exports = {
    add : function (req, res, next) {
        let user = req.body;
        let connection = DB.connect();

        connection.query('INSERT INTO users SET ?', user, function (errs, results) {
            connection.end();

            if (results.insertId !== 0) {
                res.status(201).end(`User ${user.login} was added!`);
            }else {
                next(errs);
            }
        });
    },
    del : function (req, res, next) {
        let userID = req.params.id;
        let connection = DB.connect();

        connection.query('DELETE FROM users WHERE id = ?', userID, function (errs, results) {
            connection.end();

            if (results.affectedRows != 0) {
                res.status(200).end(`User with ID = ${userID} was deleted!`);
            }else {
                next(errs);
            }
        });
    },
    update : function (req, res, next) {
        let userID = req.params.id;
        let connection = DB.connect();

        connection.query('UPDATE users SET login = ?, password = ? WHERE id = ?', [ "login", "title", userID ], function (errs, results) {
            connection.end();

            if (results.affectedRows != 0) {
                res.status(200).end(`User with ID = ${userID} was updated!`);
            }else {
                next(errs);
            }
        });
    },
    get : function (req, res, next) {
        let userID = req.params.id;
        let connection = DB.connect();

        connection.query('SELECT * FROM users WHERE id = ?', userID, function (errs, users) {
            connection.end();

            if (users.length !== 0) {
                res.status(200).json(users[0]);
            } else {
                next(errs);
            }
        });
    },
    findById : function (id) {
        let connection = DB.connect();

        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM users WHERE id = ?', id, function (errs, users) {
                check(errs, connection);

                if (users.length > 0) {
                    resolve(users[0]);
                }else {
                    reject(new Error("User not found"));
                }
            });
        });
    },
    findByName : function (username) {
        let connection = DB.connect();

        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM users WHERE login like ?', username, function (errs, users) {
                check(errs, connection);

                if (users.length > 0) {
                    resolve(users[0]);
                }else {
                    reject(new Error("User not found"));
                }
            });
        });
    }
};
