const db = require('mysql-promise')();

db.configure({
    user : 'root',
    password : '',
    host : 'localhost',
    database : 'augsburg'
});

module.exports = db;
