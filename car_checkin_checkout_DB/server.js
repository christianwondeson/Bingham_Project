// const express = require("express");
// const mysql = require("mysql");

// const app = express();
// const PORT = process.env.PORT || 3000;

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "christian@122",
//   database: "car_checkin_checkout",
//   port: PORT,
// });

// // MIDDLEWARE FOR MYSQL CONNECTION
// app.use((req, res, next) => {
//   // Check if the MySQL connection is established
//   if (db.state === "disconnected") {
//     db.connect((err) => {
//       if (err) {
//         console.error("Error connecting to MySQL:", err);
//         return res.status(500).send("Internal Server Error");
//       }
//       console.log("Reconnected to MySQL database");
//       next();
//     });
//   } else {
//     next();
//   }
// });


const express = require('express');
const mysql = require('mysql');
var app = express();


app.get('/', (req, res) => {
    res.send("hey there!sucker");
});

app.listen(3000, ()=>{
    console.log("App listening on port 3000");
});