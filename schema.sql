DROP DATABASE IF EXISTS mysqlemployee_trackerDB;
CREATE DATABASE mysqlemployee_trackerDB;

USE mysqlemployee_trackerDB;

CREATE TABLE employee(
  employee_id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT(11),
  PRIMARY KEY (employee_id),
  CONSTRAINT role FOREIGN KEY (role_id)
  REFERENCES role(role_id)
);

CREATE TABLE role(
  role_id INT,
  title_name VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  PRIMARY KEY (role_id),
  CONSTRAINT department FOREIGN KEY (department_id)
  REFERENCES department(department_id)

);

CREATE TABLE department(
  department_id INT,
  department_name VARCHAR(30),
  PRIMARY KEY (department_id)
);