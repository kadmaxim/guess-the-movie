const DB = require('./../config/db-client');

function check(err, conn){
    if (err) throw err;

    conn.end();
}

module.exports = {
    add : function (req, res) {
        let film = req.body;
        let connection = DB.connect();

        connection.query('INSERT INTO movies SET ?', film, function (errs, results) {
	connection.end();
			
	res.redirect('/admin/admin');
        });
    },
    del : function (req, res) {
        let filmID = req.params.id;
        let connection = DB.connect();

        connection.query('DELETE FROM movies WHERE id = ?', filmID, function (errs, results) {
            connection.end();

            if (results.affectedRows != 0) {
                res.status(200).end(`Film with ID = ${filmID} was deleted!`);
            }else {
                next(errs);
            }
        });
    },
    update : function (req, res) {
        let filmID = req.params.id;
        let connection = DB.connect();

        connection.query('UPDATE movies SET title = ?, img = ? WHERE id = ?', [ "title", "img", filmID ], function (errs, results) {
            connection.end();

            if (results.affectedRows != 0) {
                res.status(200).end(`Film with ID = ${filmID} was updated!`);
            }else {
                next(errs);
            }
        });
    },
    get : function (req, res) {
        let filmID = req.params.id;
        let connection = DB.connect();

        connection.query('SELECT * FROM movies WHERE id = ?', filmID, function (errs, films) {
            connection.end();

            if (films.length !== 0) {
                res.status(200).json(films[0]);
            } else {
                next(errs);
            }
        });
    },
    getAll : function (req, res) {
        let connection = DB.connect();

        connection.query('SELECT * FROM movies', function (errs, films) {
            connection.end();

            if (films.length !== 0) {
                res.status(200).json(films);
            } else {
                next(errs);
            }
        });
    }
};
