const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  // Your MySQL username,
  user: 'kingbee',
  // Your MySQL password
  password: 'buzzbuzz',
  database: 'emplytracker'
});

module.exports = db;