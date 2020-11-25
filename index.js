var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "KFields@1991!",
//   Don't Forget to input DATABASE NAME HERE
  database: "employee_trackerDB"
});

connection.connect(function(err) {
    if (err) throw err;
    start();
  });

  function start() {
    //   Inquirer prompt goes here
    inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "view all employees",
        "add employee",
        "view all employees by department",
        "view all departments",
        "add department",
        "view all roles",
        "update employee role",
        "add role",
        "exit"
      ]
    })
    .then(function(answer) {
        switch (answer.action) {
        case "view all employees":
          employeeView();
          break;
  
        case "add employee":
          addEmployee();
          break;
  
        case "view all employees by department":
          employeesByDepartment();
          break;
  
        case "view all departments":
          viewDepartments();
          break;
        
        case "add department":
            addDepartment();
            break;
    
        case "view all roles":
            viewRoles();
            break;
    
        case "update employee role":
            updateEmployeeRole();
            break;
    
        case "add role":
            addRole();
            break;
        
        case "exit":
          connection.end();
          break;
        }
      });
  }
//   creating functions for cases

  function employeeView() {
    var query = "SELECT * FROM employee;";
    connection.query(query, function(err, res) {
        if (err) throw err;
      console.table(res)
      start();
    })
  }
//   should render all employees list and info

  function addEmployee() {
    inquirer
    .prompt({
      name: "firstname",
      type: "input",
      message: "Employee's first name?"
    },
    {
        name: "lastname",
        type: "input",
        message: "Employee's last name?"
    },
    {
        name: "role",
        type: "rawlist",
        message: "Which Role would you like to assign?",
        choices: [
          "Sales Lead",
          "Sales Person",
          "Lead Engineer",
          "Software Engineer",
          "Accountant",
          "Legal Team Lead",
          "Lawyer"
        ]
    },
    {
        name: "manager",
        type: "rawlist",
        message: "Which Role would you like to assign?",
        choices: [
          ""
        //   how do I get manager information here so that I can use info as a choice?
        ]
      }

    ).then(function(answer) {
    connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?)", [answer.firstname, answer.lastname, answer.role], function(err, res) {
            if (err) throw err;
          console.table(res)
          start();
    })
    })
}
//  should add employee to list of employees
    // input: firstname
    // input: lastname
    // list option for: title/role
    // list option for: department
    //input:  salary
    // list option for: manager

  function employeesByDepartment() {}
//   should render a chart of employees based off of which department they're in
    //   choice of different departments to choose from 
        //   followed by employee list for chosen

  function viewDepartments() {}
//   should render the different available departments
//   ?and employees in each?

  function addDepartment() {}
//   should add input 

  function viewRoles() {}
//   should render different role options
//   list of roles available

  function updateEmployeeRole() {}
//   choice of employee roles to choose from

  function addRole() {}
//   adds new role option to roles
    // input salary?
