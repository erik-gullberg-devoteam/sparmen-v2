
const mysql = require('mysql');

const config = {
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'varglad'
};

const connection = mysql.createConnection(config);

connection.query('SELECT * FROM spex', (err, results) => {
  if (err) throw err;
  console.log(results);
});

connection.end();