-- Insert Cars
-- Insert sample data into the cars table with Ethiopian private plate numbers
INSERT INTO cars (plate_number, make, model, color) VALUES
('AA123ABC', 'Toyota', 'Camry', 'Blue'),
('BB456XYZ', 'Honda', 'Civic', 'Red'),
('CC789DEF', 'Ford', 'Focus', 'Silver'),
('DD012GHI', 'Chevrolet', 'Malibu', 'Black'),
('EE345JKL', 'Nissan', 'Altima', 'White'),
('FF678MNO', 'Hyundai', 'Elantra', 'Gray'),
('GG901PQR', 'Subaru', 'Impreza', 'Green'),
('HH234STU', 'Volkswagen', 'Jetta', 'Yellow'),
('II567VWX', 'BMW', '3 Series', 'Black'),
('JJ890YZA', 'Mercedes-Benz', 'C-Class', 'Silver');

-- Insert sample data into the employees table
INSERT INTO employees (name, rfid_id) VALUES
('John Doe', 'RFID123'),
('Jane Smith', 'RFID456'),
('Bob Johnson', 'RFID789'),
('Alice Brown', 'RFID012'),
('Charlie Davis', 'RFID345'),
('Eva White', 'RFID678'),
('Frank Miller', 'RFID901'),
('Grace Wilson', 'RFID234'),
('Harry Thompson', 'RFID567'),
('Ivy Garcia', 'RFID890');


-- Perform a Check-In
INSERT INTO checkin_checkout_log (car_id, employee_id) VALUES
(1, 1);  -- John Doe checks in car with plate number 0123456

-- Perform a Check-Out
UPDATE checkin_checkout_log SET checkout_time = CURRENT_TIMESTAMP WHERE log_id = 1;
