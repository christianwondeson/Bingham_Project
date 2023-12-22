SELECT cars.*, employees.name AS checked_in_by, car_maintenance_status.status
FROM checkin_checkout_log
JOIN cars ON checkin_checkout_log.car_id = cars.car_id
JOIN employees ON checkin_checkout_log.employee_id = employees.employee_id
JOIN car_maintenance_status ON cars.car_id = car_maintenance_status.car_id
WHERE checkout_time IS NULL;
