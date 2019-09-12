const mysqlConnect = require('./dbConnect');

// exports.checkId = (req, res, next, val) => {
//   console.log(res);
//   if (req.params.id * 1 > res.length) {
//     return res.status(404).send({
//       status: 'Failed',
//       message: 'Invalid id'
//     });
//   }
//   next();
// };

exports.getUsers = (req, res) => {
  mysqlConnect.query('SELECT*FROM users', (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
};

exports.getUser = (req, res) => {
  mysqlConnect.query(
    'SELECT*FROM users WHERE user_id = ?',
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
};

exports.deleteUser = (req, res) => {
  mysqlConnect.query(
    'DELETE FROM users WHERE user_id = ?',
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(`User ${req.params.id} has been deleted!!`);
      else console.log(err);
    }
  );
};

exports.createUser = (req, res) => {
  user = req.body;
  let post_sql =
    'SET @user_id = ?; SET @user_name = ?; SET @user_email_address = ?; SET @user_password = ?;\
    CALL createEditUser (@user_id, @user_name, @user_email_address, @user_password)';
  mysqlConnect.query(
    post_sql,
    [user.user_id, user.user_name, user.user_email_address, user.user_password],
    (err, rows, fields) => {
      if (!err)
        rows.forEach(element => {
          if (element.constructor == Array)
            res.send(`User id : ${element[0].user_id} has been inserted`);
        });
      else console.log(err);
    }
  );
};
exports.updateUser = (req, res) => {
  user = req.body;
  let post_sql =
    'SET @user_id = ?; SET @user_name = ?; SET @user_email_address = ?; SET @user_password = ?;\
    CALL createEditUser (@user_id, @user_name, @user_email_address, @user_password)';
  mysqlConnect.query(
    post_sql,
    [user.user_id, user.user_name, user.user_email_address, user.user_password],
    (err, rows, fields) => {
      if (!err) res.send(`User id : ${user.user_id} updated successfully`);
      else console.log(err);
    }
  );
};
