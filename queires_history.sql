SELECT cars.plate_number, employees.name AS employee_name, checkin_time, checkout_time
FROM checkin_checkout_log
JOIN cars ON checkin_checkout_log.car_id = cars.car_id
JOIN employees ON checkin_checkout_log.employee_id = employees.employee_id;
