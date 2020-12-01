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
  database: "mysqlemployee_trackerDB"
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
      type: "rawlist",
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

    connection.query("SELECT manager_id, first_name, last_name, role_id FROM employee", function(err, results) {
      if (err) throw err;
      
    inquirer
      .prompt([
        {
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
          type: "list",
          message: "Which Role would you like to assign?",
          choices: [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7"
          ]
        },
        {
          name: "manager",
          type: "list",
          message: "Select Manager ID new employe will be placed under?",
          choices : [
            "1",
            "2",
            "3",
            "4"
          ]
        }
    
  
  // })
    
    
  ]).then(function(answer) {
      console.log(answer);
    //   // CONNECTION MESSED UP BECAUSE ROLE_ID AND MANAGER_ID TAKE IN INTEGERS AND I"M CURRENTLY TRYING TO PASS THEM STRINGS
    //   // var query = "SELECT first_name, last_name, role_id, manager_id";
    //  var query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ?";
    //   connection.query(query, (answer.firstname, answer.lastname, answer.role, answer.manager), function(err, res) {
    //         if (err) throw err;
    //         // for (var i = 0; i < res.length; i++) {
    //         //   console.log(
    //         //     "first_name: " +
    //         //       res[i].firstname +
    //         //       " || last_name: " +
    //         //       res[i].lastname +
    //         //       " || role_id: " +
    //         //       res[i].role +
    //         //       " || manager_id: " +
    //         //       res[i].manager
    //         //   );
    //         // }
    //       console.table(res)
          start();
    // })
    })
  })
}


// function managersFunc() {
//   connection.query("FROM employee (manager_id) VALUES (?)", [answer.manager], function(err, res) {
//     if (err) throw err;
//   console.table(res)
//   start();
// })
// }
//  should add employee to list of employees
//     input: firstname
//     input: lastname
//     list option for: title/role
//     list option for: department
//     input:  salary
//     list option for: manager

  function employeesByDepartment() {
    // is this where we would write a JOIN STATEMENT or in SCHEMA.SQL??
    var query = "SELECT title_name, first_name, last_name, department_name FROM role, employee, department";
      connection.query(query, function(err, res) {
        if (err) throw err;
      console.table(res)
      start();
    })

  }
//   should render a chart of employees based off of which department they're in
//       choice of different departments to choose from >rawlist< 
//           followed by employee list for chosen

  function viewDepartments() { var query = "SELECT * FROM department;";
      connection.query(query, function(err, res) {
        if (err) throw err;
      console.table(res)
      start();
    })}
//   should render the different available departments
//   ?and employees in each?
 

  function addDepartment() {
    connection.query("SELECT * FROM department", function(err, results) {
      if (err) throw err;
      inquirer
      .prompt([
        {
        name: "choice",
        type: "rawlist",
        message: "Enter New Department name?",
        choices: function() {
          var choiceArray = [];
          for (var i = 0; i < results.length; i++) {
            // pushes item to result[array].item_name which is in the table
            choiceArray.push(results[i].department_name);
          }
          return choiceArray;
        },
      },
      {
        name: "id",
        type: "input",
        message: "new department number?"
      }
      // need to be able to enter a new department and not pick from ones already there
      ]).then(function(answer){
      console.log(answer);
        var newDepartment;
        for (var i = 0; i < results.length; i++) {
          if (results[i].department === answer.id) {
            newDepartment = results[i];
            console.log(newDepartment);
            console.log(answer.id);
           }
         }
         if (newDepartment < (answer.id)) {
          // bid was high enough, so update db, let the user know, and start over
          connection.query(
            "INSERT INTO department SET ? WHERE ?",
            [
              {
                department_name: answer.choice
              },
              {
                id: newDepartment.id
              }
            ],
            function(error) {
              if (error) throw err;
              console.log("department created successfully!");
              start();
            }
            );
          }
          else {console.log("system error...");}
          start();
    })
  })
}
//   should add input 

  function viewRoles() { var query = "SELECT * FROM role;";
  connection.query(query, function(err, res) {
    if (err) throw err;
  console.table(res)
  start();
})}
// //   should render different role options
// //   list of roles available

//   function updateEmployeeRole() {},
// //   choice of employee roles to choose from

  function addRole() {
    inquirer
    .prompt({
      name: "newRole",
      type: "input",
      message: "Enter New Role Title?"
    },
    ).then(function(answer){
      var query = "INSERT INTO role;";
      connection.query(query, function(err, res) {
        if (err) throw err;
      console.table(res)
      start();  
    })
  })
}
//   adds new role option to roles
//     input salary?
