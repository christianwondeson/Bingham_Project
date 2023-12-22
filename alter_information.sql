-- Define Foreign Key Relationships
ALTER TABLE checkin_checkout_log
ADD FOREIGN KEY (car_id) REFERENCES cars(car_id);

ALTER TABLE checkin_checkout_log
ADD FOREIGN KEY (employee_id) REFERENCES employees(employee_id);

ALTER TABLE car_maintenance_status
ADD FOREIGN KEY (car_id) REFERENCES cars(car_id);
