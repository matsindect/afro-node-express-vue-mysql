const mysqlConnect = require('./dbConnect');
const bcrypt = require('bcrypt');

function User() {}

User.prototype = {
  find: function(user, callback) {
    // if (user) {
    //   var field = Number.isInteger(user) ? 'id' : 'user_name';
    // }

    let sql = `SELECT* FROM users WHERE user_name = ?`;

    mysqlConnect.query(sql, user, (err, result) => {
      if (err) throw err;
      console.log(result);
      callback(result);
    });
  },

  create: function(body, callback) {
    let pwd = body.user_password;
    body.user_password = bcrypt.hashSync(pwd, 10);

    let sql = `SET @user_id = 0; SET @user_name = ?; SET @user_email_address = ?; SET @user_password = ?; CALL createEditUser (@user_id, @user_name, @user_email_address, @user_password)`;
    mysqlConnect.query(
      sql,
      [body.user_name, body.user_email_address, body.user_password],
      (err, lastId) => {
        if (err) throw err;
        callback(lastId);
      }
    );
  },

  login: function(user_name, user_password, callback) {
    this.find(user_name, user => {
      if (user) {
        console.log(user);
        if (bcrypt.compareSync(user_password, user.user_password)) {
          callback(user);
          return;
        }
      }
      callback(null);
    });
  }
};

module.exports = User;
