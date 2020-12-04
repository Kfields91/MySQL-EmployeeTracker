var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');
// const employee = [];

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "KFields@1991!",
//   Don't Forget to input DATABASE NAME HERE
  database: "employee_tracker2020DB"
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

  function employeeView() {
    var query = "SELECT employee_id, first_name, last_name, title_name, department_name, salary, manager_id FROM ((role INNER JOIN employee ON role.role_id = employee.role_id) INNER JOIN department ON role.department_id = department.department_id);"
    connection.query(query, function(err, res) {
        if (err) throw err;
      console.table(res)
      start();
    })
  }

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
        // console.log(answer);
        // empArr.push(answer.firstname, answer.lastname);
        // console.log(empArr);
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
            // start();
          })
  })
}

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
            // console.log(choiceArray);
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

        if (chosenTitle.title_name === answer.choice) {
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
              console.log(` \n Title chosen successfully! \n `);
              // chooseManager();
              start();
              
            }
            );
          }
          else {
            console.log("error");
          }
        });
      })
      // chooseManager();
}
// currently not working how I'd hoped
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
            // console.log(newArray);
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
          console.log("error");
          start();
        }
      });
  })
}

  function employeesByDepartment() {
    var query = "SELECT department_name FROM department";
      connection.query(query, function(err, res) {
        if (err) throw err;

      inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          message: "Which department would you like to look at?",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < res.length; i++) {
              // pushes item to result[array]. which is in the table
              choiceArray.push(res[i].department_name);
            }
            // console.log(choiceArray);
            return choiceArray;
          }

        }
      ]).then(function(answer) {
        // console.log(answer);
        var chosenDepartment;
        for (var i = 0; i < res.length; i++) {
          if (res[i].department_name === answer.choice) {
            chosenDepartment = res[i];
            // console.log(chosenDepartment);
          }
        } 
        if (chosenDepartment.department_name === answer.choice) {
          employeeChoice();
        }  
      })
    })
  }

  function employeeChoice() {
    var query = "SELECT first_name, last_name FROM employee";
          connection.query(query, function(error, res) {
            if (error) throw error;
            inquirer.prompt([
              {
                name: "choice",
                type: "list",
                message: "list of employees?",
                choices: function() {
                  var nextArray = [];
                  for (var i = 0; i < res.length; i++) {
                    // pushes item to result[array].item_name which is in the table
                    nextArray.push(res[i].first_name);
                    nextArray.push (res[i].last_name);
                    // nextArray.join()
                  }
                  // console.log(nextArray);
                  return nextArray;
                }
      
              }
            ]).then(function(answer) {
              // console.log(answer);
              var chosenEmployee;
              for (var i = 0; i < res.length; i++) {
                if (res[i].first_name + " " + res[i].last_name === answer.choice) {
                  chosenEmployee = res[i];
                  // console.log(chosenEmployee);
                }
              } 
              // employeeView();
              // connection.query(
              //   "SELECT employee_id,"
              // )
              // employee.push(title);
              // console.log("Title chosen successfully!");
              start();
              // NOT WORKING. UNHANDLED PROMISE?
            }
            );
          })

  }


  function viewDepartments() { var query = "SELECT department_name FROM department;";
      connection.query(query, function(err, res) {
        if (err) throw err;
      console.table(res)
      start();
    })}


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

// UNDER CONSTRUCTION
  function updateEmployeeRole() {
    console.log(` \n Currently unavailable... \n `);
    start();
  }
// //   choice of employee roles to choose from

// This function is still being worked out
  function addRole() { 
    var query = "SELECT title_name, salary FROM role INNER JOIN department ON role.department_id = department.department_id;";
    connection.query(query, function(err, results) {
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
      },
      // {
      //   name: "choice",
      //   type: "rawlist",
      //   // message: "Which department id will this role belong to?",
      //   choices: function() {
      //     var anotherArray = [];
      //     for (var i = 0; i < results.length; i++) {
      //       // pushes item to result[array].item_name which is in the table
      //       anotherArray.push(results[i].department_id);
      //     }
      //     console.log(anotherArray);
      //     return anotherArray;
      //   },
      //   message: "Which id will be assigned to new role?"
      //  }
    ])
    .then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO role SET ?",
        {
          title_name: answer.name,
          salary: answer.salary,
          // department__id: answer.choice
          // department_name: answer.department
        },
        function(err) {
          if (err) throw err;
          console.log("role created successfully!");
          
          start();
        }
      );
    });
  })
  }