var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');
const employee = [];
const emp = {};

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
    var query = "SELECT employee_id, first_name, last_name, title_name, department_name, salary, manager_id FROM ((role INNER JOIN employee ON role.role_id = employee.role_id) INNER JOIN department ON role.department_id = department.department_id);"
    connection.query(query, function(err, res) {
        if (err) throw err;
      console.table(res)
      start();
    })
  }
  // SELECT employee_id, first_name, last_name FROM employee
//   should render all employees list and info

  function addEmployee() {
    empArr = []
    connection.query("SELECT employee_id, first_name, last_name, title_name, salary, manager_id FROM employee INNER JOIN role on employee.role_id = role.role_id;", function(err, results) {
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
        }
      ]).then(function(answer) {
        console.log(answer);
        empArr.push(answer.firstname, answer.lastname);
        console.log(empArr);
        chooseTitle();
        // console.log(answer.choice);
        connection.query(
          "INSERT INTO employee SET ?",
          {
            first_name: answer.firstname,
            last_name: answer.lastname
            
          },
          "INSERT INTO role set ?",
          {
            title_name: answer.choice
          }, function(err) {
            if (err) throw err;
            })
            // chooseManager();
            // start();
          })
  })
}
  // connection.query("SELECT department_id, role_id, title_name FROM role INNER JOIN department ON role.department_id = department.department_id;;", function(err, results) {}

function chooseTitle() {
  const title = [];
  // query the database for all items being auctioned
  connection.query("SELECT role_id, title_name FROM role INNER JOIN department ON role.department_id = department.department_id;", function(err, results) {
    if (err) throw err;
    // once you have the items, prompt the user for which they'd like to bid on
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              // pushes item to result[array].item_name which is in the table
              choiceArray.push(results[i].title_name);
            }
            console.log(choiceArray);
            return choiceArray;

          },
          message: "Which Title will the new employee be assigned?"
        }
      ])
      .then(function(answer) {
        // get the information of the chosen item
        var chosenTitle;
        for (var i = 0; i < results.length; i++) {
          if (results[i].title_name === answer.choice) {
            chosenTitle = results[i];
            title.push(chosenTitle.title_name);
          }
        }
        console.log(typeof chosenTitle.title_name);
        console.log(chosenTitle.title_name, answer.choice);
        console.log(typeof answer.choice);
        // determine if bid was high enough
        if (chosenTitle.title_name === answer.choice) {
          // bid was high enough, so update db, let the user know, and start over
          connection.query(
            "INSERT INTO role SET ?",
            [
              {
                title_name: answer.choice
              }
            ],
            function(error) {
              if (error) throw err;
              // employee.push(title);
              console.log("Title chosen successfully!");
              start();
              // NOT WORKING. UNHANDLED PROMISE?
              // start();
            }
            );
          }
          else {
            // bid wasn't high enough, so apologize and start over
            console.log("error");
            // chooseManager();
          }
        });
      })
      // chooseManager();
}
// currently not running
function chooseManager() {
  connection.query("SELECT manager_id FROM employee;", function(err, results) {
    if (err) throw err;
    // once you have the items, prompt the user for which they'd like to bid on
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function() {
            var newArray = [];
            for (var i = 0; i < results.length; i++) {
              // pushes item to result[array].item_name which is in the table
              newArray.push(results[i].manager_id);
            }
            console.log(newArray);
            return newArray;
          },
          message: "Which manager will be assigned to this employee?"
        }
      ])
      .then(function(answer) {
        // get the information of the chosen item
        var chosenManager;
        for (var i = 0; i < results.length; i++) {
          if (results[i].manager_id === answer.choice) {
            chosenManager = results[i];
          }
        }

        // determine if bid was high enough
        if (chosenManager.manager_id === answer.choice) {
          // bid was high enough, so update db, let the user know, and start over
          connection.query(
            "INSERT employee SET ?",
            [
              {
                manager_id: answer.choice
              }
            ],
            function(error) {
              if (error) throw err;
              console.log("Manager chosen successfully!");
              // start();
              start();
            }
          );
        }
        else {
          // bid wasn't high enough, so apologize and start over
          console.log("error");
          start();
        }
      });
  })
}

  function employeesByDepartment() {
    // is this where we would write a JOIN STATEMENT or in SCHEMA.SQL??
    var query = "SELECT title_name, first_name, last_name, department_name FROM role, employee, department";
      connection.query(query, function(err, res) {
        if (err) throw err;
      console.table(res)
      start();
    })

  }
// //   should render a chart of employees based off of which department they're in
// //       choice of different departments to choose from >rawlist< 
// //           followed by employee list for chosen

  function viewDepartments() { var query = "SELECT department_name FROM department;";
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
        name: "name",
        type: "input",
        message: "What is the name of the department you would like to add?"
      },
    ])
    .then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO department SET ?",
        {
          department_name: answer.name,
          // department_id: answer.id
        },
        function(err) {
          if (err) throw err;
          console.log("department created successfully!");
          // re-prompt the user for if they want to bid or post

          start();
        }
      );
    });
  })
  }

  function viewRoles() { var query = "SELECT title_name, salary, department_name FROM role INNER JOIN department ON role.department_id = department.department_id;";
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
    connection.query("SELECT title_name, salary FROM role;", function(err, results) {
      if (err) throw err;
    inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "What is the name of the role you would like to add?"
      },
      {
        name: "salary",
        type: "input",
        message: "What will be the salary for this role?",
      }
      //   {
      //     name: "department",
      //     type: "rawlist",
      //     choices: function() {
      //       var newerArray = [];
      //       for (var i = 0; i < results.length; i++) {
      //         // pushes item to result[array].item_name which is in the table
      //         newerArray.push(results[i].department_name);
      //       }
      //       console.log(newerArray);
      //       return newerArray;
      //     },
      //     message: "What department will this role belong too?",
      // }
    ])
    .then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO role SET ?",
        {
          title_name: answer.name,
          salary: answer.salary,
          // department_name: answer.department
        },
        function(err) {
          if (err) throw err;
          console.log("role created successfully!");
        
        
          // connection.query(
        //   "INSERT role_id INTO department, employee SET ?",
        //   {
        //     role_id: answer
        //   }
        // )
        start();
      })
      });
    })
}