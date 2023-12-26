-- Create the car_maintenance table
CREATE TABLE car_maintenance (
    maintenance_id INT PRIMARY KEY AUTO_INCREMENT,
    car_id INT,
    maintenance_description VARCHAR(255),
    maintenance_date DATE,
    maintenance_status ENUM('Scheduled', 'In Progress', 'Completed') DEFAULT 'Scheduled',
    FOREIGN KEY (car_id) REFERENCES cars(car_id)
);

-- Insert sample data into the car_maintenance table
INSERT INTO car_maintenance (car_id, maintenance_description, maintenance_date, maintenance_status) VALUES
(1, 'Oil Change', '2023-01-10', 'Completed'),
(2, 'Brake Inspection', '2023-01-15', 'In Progress'),
(3, 'Tire Rotation', '2023-01-20', 'Scheduled'),
(4, 'Air Filter Replacement', '2023-01-25', 'Scheduled'),
(5, 'Transmission Fluid Check', '2023-02-01', 'In Progress');