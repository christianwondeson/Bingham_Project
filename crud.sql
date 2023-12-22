CREATE TABLE cars (
    car_id INT PRIMARY KEY AUTO_INCREMENT,
    plate_number VARCHAR(15) NOT NULL,
    make VARCHAR(50),
    model VARCHAR(50),
    color VARCHAR(20)
);
CREATE TABLE employees (
    employee_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    rfid_id VARCHAR(20) UNIQUE
);
CREATE TABLE car_maintenance_status (
    car_id INT PRIMARY KEY,
    status VARCHAR(50) DEFAULT 'Available',
    FOREIGN KEY (car_id) REFERENCES cars(car_id)
);
CREATE TABLE checkin_checkout_log (
    log_id INT PRIMARY KEY AUTO_INCREMENT,
    car_id INT,
    employee_id INT,
    checkin_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    checkout_time TIMESTAMP
);
CREATE TABLE car_reservations (
    reservation_id INT PRIMARY KEY AUTO_INCREMENT,
    car_id INT,
    employee_id INT,
    start_time DATETIME,
    end_time DATETIME,
    FOREIGN KEY (car_id) REFERENCES cars(car_id),
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);

