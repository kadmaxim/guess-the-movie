let mysql = require('mysql');

function getDBConnection() {
    var connection = mysql.createConnection({
        user: 'root',
        password: '',
        host: 'localhost',
        database: 'augsburg'
    });
    return connection;
}

module.exports = {
    connect: getDBConnection
};
