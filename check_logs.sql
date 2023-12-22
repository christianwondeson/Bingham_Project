CREATE TABLE checkin_checkout_log (
	log_id INT PRIMARY KEY AUTO_INCREMENT,
    car_id INT,
    employee_id INT,
    checkin_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    checkout_time TIMESTAMP DEFAULT '1970-01-01 00:00:00'
);


