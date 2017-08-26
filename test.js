var mysql = require('mysql');
var connection = mysql.createConnection(process.env.JAWSDB_URL);

connection.connect();

connection.query('SHOW TABLES', function(err, rows, fields) {
  if (err) throw err;

  console.log(rows);
});

connection.end();