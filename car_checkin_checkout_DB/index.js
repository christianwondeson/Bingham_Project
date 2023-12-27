const express = require("express");
const mysql = require("mysql");

const app = express();
const PORT = process.env.PORT || 3000;

const DB = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "christian@122",
  database: "car_checkin_checkout",
  port: PORT,
});

// MIDDLEWARE FOR MYSQL CONNECTION
app.use((req, res, next) => {
  if (DB.state === "disconnected") {
    DB.connect((err) => {
      if (err) {
        console.error("Error connecting to MYSQL:", err);
        return res.status(500).send("Intenal Server Error");
      }
      console.log("Reconnected to MYSQL");
      next();
    });
  } else {
    next();
  }
});

// Routes

// home page
app.get("/", (req, res) => {
  res.send("welcome to home page");
});

// sign in page
app.get("/sign-in", (req, res) => {
  res.send("Sign In page");
});
// fetching vehicle models
app.get("./vehicle-models", (req, res) => {
  // Query vehicle models from the database
  DB.query(`SELECT * FROM cars`, (err, result) => {
    if (err) {
      console.error("Error fetching vehicle models :", err);
      return res.status(500).send("Internal Server Error");
    }
    res.json(result);
  });
});

// employees table fetching
app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employees", (err, results) => {
    if (err) {
      console.error("Error fetching employees:", err);
      return res.status(500).send("Internal Server Error");
    }
    res.json(results);
  });
});

app.get("/check-logs", (req, res) => {
  // Query check-in and check-out logs from the database with car and employee details
  db.query(
    `
      SELECT check_log.log_id, cars.plate_number, employees.name AS employee_name, 
             check_log.checkin_time, check_log.checkout_time
      FROM check_log
      JOIN cars ON check_log.car_id = cars.car_id
      JOIN employees ON check_log.employee_id = employees.employee_id
    `,
    (err, results) => {
      if (err) {
        console.error("Error fetching check logs:", err);
        return res.status(500).send("Internal Server Error");
      }
      res.json(results);
    }
  );
});

// Reservations
app.get("/reservations", (req, res) => {
  // Query reservations from the database with car and employee details
  db.query(
    `
      SELECT car_reservations.reservation_id, cars.plate_number, employees.name AS employee_name,
             car_reservations.reservation_start, car_reservations.reservation_end, 
             car_reservations.reservation_status
      FROM car_reservations
      JOIN cars ON car_reservations.car_id = cars.car_id
      JOIN employees ON car_reservations.employee_id = employees.employee_id
    `,
    (err, results) => {
      if (err) {
        console.error("Error fetching reservations:", err);
        return res.status(500).send("Internal Server Error");
      }
      res.json(results);
    }
  );
});

// Book Reservation Page
app.get("/book-reservation", (req, res) => {
  res.send("Book Reservation Page");
});

// POST route to handle booking reservations
app.post("/book-reservation", (req, res) => {
  // Process reservation booking logic here
  const { car_id, employee_id, reservation_start, reservation_end } = req.body;
  // Insert the reservation into the car_reservations table
  db.query(
    "INSERT INTO car_reservations (car_id, employee_id, reservation_start, reservation_end, reservation_status) VALUES (?, ?, ?, ?, ?)",
    [car_id, employee_id, reservation_start, reservation_end, "Pending"],
    (err, result) => {
      if (err) {
        console.error("Error booking reservation:", err);
        return res.status(500).send("Internal Server Error");
      }
      res.send("Reservation booked successfully!");
    }
  );
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
