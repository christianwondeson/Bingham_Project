CREATE TABLE check_log (
    log_id INT PRIMARY KEY AUTO_INCREMENT,
    car_id INT,
    employee_id INT,
    checkin_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    checkout_time TIMESTAMP
);