var db = require('./mysql.js');
var sql = 'SELECT * from user';
db.query(sql, function (err, rows, fields) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(rows);
});