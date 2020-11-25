DROP DATABASE IF EXISTS employee_trackerDB;
CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

  CREATE TABLE employee(
  employee_id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT(11),
  PRIMARY KEY (employee_id)
);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kelsea", "Fields", 1, 2);