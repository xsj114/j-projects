const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'xsjll114710',
    database: 'test',
    port: '3306'
})

connection.query(
    'SELECT * FROM `person`',
    function(err, results, fields) {
        console.log(results); // 结果集
    }
);





