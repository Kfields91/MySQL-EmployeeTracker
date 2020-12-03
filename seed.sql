INSERT INTO department(department_id, department_name)
VALUES (1, "Sales"), (2, "Engineering"), (3, "Finance"), (4, "Legal");

-- CREATING ROLES
INSERT INTO role(title_name, salary, department_id)
VALUES ("Lead Sales", 200000, 1), ("Salesperson", 75000, 1), ("Lead Engineer", 125000, 2), ("Software Engineer", 60000, 2), ("Accountant", 100000, 3), ("Lawyer", 200000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kelsea", "Fields", 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("George", "Random", 2, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Somebody", "Fields", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Andrew", "Gray", 4, null);