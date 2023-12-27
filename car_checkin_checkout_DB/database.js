const mysql = require("mysql");

const connect = mysql.createConnection({
  host: "localhost",
  database: "car_checkin_checkout",
  user: "root",
  password: "christian@122",
});
module.exports = connect;