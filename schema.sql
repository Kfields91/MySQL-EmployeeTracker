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

-- create departments
--create roles
-- inner join department with roles
-- Inner join role with employee

-- CREATING DEPARTMENTS
INSERT INTO department(department_id, department_name)
VALUES (1, "Sales");
INSERT INTO department(department_id, department_name)
VALUES (2, "Engineering");
INSERT INTO department(department_id, department_name)
VALUES (3, "Finance");
INSERT INTO department(department_id, department_name)
VALUES (4, "Legal");
-- could I create mangament as another department?
-- INSERT INTO department(department_id, department)
-- VALUES (5, "Management");

-- CREATING ROLES
INSERT INTO role(title_name, salary, department_id)
VALUES ("Lead Sales", 200000, 1);
INSERT INTO role(title_name, salary, department_id)
VALUES ("Salesperson", 75000, 1);
INSERT INTO role(title_name, salary, department_id)
VALUES ("Lead Engineer", 125000, 2);
INSERT INTO role(title_name, salary, department_id)
VALUES ("Software Engineer", 60000, 2);
INSERT INTO role(title_name, salary, department_id)
VALUES ("Accountant", 100000, 3);
INSERT INTO role(title_name, salary, department_id)
VALUES ("Lawyer", 200000, 4);
INSERT INTO role(title_name, salary, department_id)
VALUES ("Lead Legal Team", 150000, 4);
-- INSERT INTO role(title_name, salary, department_id)
-- VALUES ("Manager", 100000, 5)

-- need a JOIN for role_id and role.role_id

-- find all role, find all employees, which role choices? this is the id and this is the title
-- what is the employees role?

-- managers
-- should I create a table just for managers?
-- join that table with employee, roles, and department?
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kelsea", "Fields", 1, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("George", "Random", 2, 2)
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Somebody", "Fields", 3, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Andrew", "Gray", 4, 4);

-- could I do a sort of JOIN here to join manager_id with employee_id?
-- only if new table created?
-- would a class somehow work better?

