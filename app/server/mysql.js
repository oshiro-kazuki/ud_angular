const mysql = require('mysql2');
const config = require('./config');
// const config = require('./config/dev');

const connection = mysql.createConnection({
  host      : config.HOST,
  user      : config.USER,
  password  : config.PASS,
  database  : config.DATABASE
});

connection.connect((err) => {
  if (err) {
    console.log('error');
    return;
  }
  console.log('success');
});


module.exports = connection;