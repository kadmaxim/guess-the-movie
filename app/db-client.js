let mysql = require('mysql');

module.exports = {
    connect: function() {
        let connection = mysql.createConnection({
            user: 'root',
            password: '',
            host: 'localhost',
            database: 'augsburg'
        });
        
        return connection;
    }
};
