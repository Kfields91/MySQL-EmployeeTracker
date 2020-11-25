var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "KFields@1991!",
//   Don't Forget to input DATABASE NAME HERE
  database: ""
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

  function employeeView() {}
//   should render all employees list and info

  function addEmployee() {}
//  should add employee to list of employees
    // input: firstname
    // input: lastname
    // list option for: title/role
    // list option for: department
    //nput:  salary
    // ist option for: manager

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
