const mysql = require('mysql');
const util = require('util');

// Database connections
const mysqlConnect = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'tinashewasmolly@LOVE1',
  database: 'afroorig_db',
  multipleStatements: true
});

mysqlConnect.getConnection(err => {
  if (!err) console.log('DB connection succeeded');
  else console.log('Connection Failed' + JSON.stringify(err, undefined, 2));
});

mysqlConnect.query = util.promisify(mysqlConnect.query);

module.exports = mysqlConnect;
