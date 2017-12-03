const DB = require('./db-client');
const Response = require('./response');

function check(err, conn){
    if (err) throw err;

    conn.end();
}

module.exports = {
    add : function (req, res) {
        let film = req.body;
        let resp = Response.init;
        let connection = DB.connect();

        connection.query('INSERT INTO movies SET ?', film, function (errs, results) {
            check(errs, connection);

            if (results.insertId === 0) {
                resp.msg = `Film ${film.title} was not added!`;
                console.log(resp.msg);
            } else {
                resp = {
                    "status" : "ok",
                    "msg" : `Film ${film.title} was added!`
                };
            }

            res.json(resp);
        });
    },
    del : function (req, res) {
        let filmID = req.params.id;
        let resp = Response.init;
        let connection = DB.connect();

        connection.query('DELETE FROM movies WHERE id = ?', filmID, function (errs, results) {
            check(errs, connection);

            if (results.affectedRows === 0) {
                resp.msg = `Film with ID = ${filmID} was not deleted!`;
                console.log(resp.msg);
            } else {
                resp = {
                    "status" : "ok",
                    "msg" : `Film with ID = ${filmID} was deleted!`
                };
            }

            res.json(resp);
        });
    },
    update : function (req, res) {
        let filmID = req.params.id;
        let resp = Response.init;
        let connection = DB.connect();

        connection.query('UPDATE movies SET title = ?, img = ? WHERE id = ?', [ "title", "img", filmID ], function (errs, results) {
            check(errs, connection);

            if (results.affectedRows === 0) {
                resp.msg = `Film with ID = ${filmID} was not updated!`;
                console.log(resp.msg);
            } else {
                resp = {
                    "status" : "ok",
                    "msg" : `Film with ID = ${filmID} was updated!`
                };
            }

            res.json(resp);
        });
    },
    get : function (req, res) {
        let filmID = req.params.id;
        let resp = Response.init;
        let connection = DB.connect();

        connection.query('SELECT * FROM movies WHERE id = ?', filmID, function (errs, films) {
            check(errs, connection);

            if (films.length === 0) {
                resp.msg = `Film with ID = ${filmID} not found!`;
                console.log(resp.msg);
            } else {
                resp = {
                    "status" : "ok",
                    "film" : films[0]
                };
            }

            res.json(resp);
        });
    }
};