// This is the utility file to ask the main questions at the beginning

// Requires
const inquirer = require('inquirer'); //Inquirer
const db = require('../db/connection');
const figlet = require('figlet'); //opening title 
const { getAllEmployees,
  getEmployeesByDepartment,
  getAllDepartments,
  getAllRoles,
  getEmployeeByManagerID,
  insertDepartment,
  insertRole,
  insertEmployee,
  updateEmployeeRole
} = require('../utils/dbUtils')

// Seeding Department Choices 
let defaultDeptChoices =[]
defaultDeptChoices.push({
  'name': 'Administration',
  'value': 1
}, {
  'name': 'Human Resources',
  'value': 2
}, {
    'name': 'Accounting',
    'value': 3
}, {
  'name': 'Sales',
  'value': 4
}, {
  'name': 'Production',
  'value': 5
}, {
  'name': 'Customer Relations',
  'value': 6
}, {
  'name': 'IT',
  'value': 7
}, {
  'name': 'Legal',
  'value': 8
}, {
  'name': 'Resource Pool',
  'value': 9
}
);
let currentDepartmentCount = 9;


// Functions

function init() {
  // Splash screen at beginning
  figlet('Employee Tracker', function (err, data) {
    if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
    }
    console.log("\n");
    console.log(data);
    return mainQuestions()
  })
};


function viewEmployees() {
  // Required function 3 - View all employees
  getAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.log("\n");
      console.table(employees);
    })
    .then(() => mainQuestions());
}

function viewEmployeesByManager(manager_id){
  // Bonus function 2 - View employees by department
  getEmployeeByManagerID(manager_id)
  .then(([rows]) => {
    let employees = rows;
    console.log("\n");
    console.table(employees);
  })
  .then(() => mainQuestions());
}

function viewEmployeesByDepartment(dept_id){
  // Bonus function 3 - View employees by department
  getEmployeesByDepartment(dept_id)
  .then(([rows]) => {
    let employees = rows;
    console.log("\n");
    console.table(employees);
  })
  .then(() => mainQuestions());
}

function viewDepartments() {
  // Required function 1 - View all departments
  getAllDepartments()
    .then(([rows]) => {
      let department = rows;
      console.log("\n");
      console.table(department);
    })
    .then(() => mainQuestions());
}

function viewRoles() {
  // Required function 2 - View all roles
  getAllRoles()
    .then(([rows]) => {
      let roles = rows;
      console.log("\n");
      console.table(roles);
    })
    .then(() => mainQuestions());
}

function addDepartment(department) {
  // Required function 4 - Add a department
  insertDepartment(department)
  currentDepartmentCount++
  defaultDeptChoices.push({
    'name': department,
    'value': currentDepartmentCount
  })
  viewDepartments()
}

function addRole(title, salary, department_id) {
  // Required function 5 - Add a role
  insertRole(title, salary, department_id)
  .then (() => viewRoles())  // Figured I'd just re-use that function b/c you'll want to see the insert
}

function addEmployee(first_name, last_name, role_id, department_id) {
  // Required function 6 - Add an employee
  insertEmployee(first_name, last_name, role_id, department_id)
  .then (() => viewEmployees())
}

function updateEmployee(employee_id, role_id) {
  // Required function 7 - Update an employee's role
  updateEmployeeRole(employee_id, role_id)
  .then (() => viewEmployees())
}

// Question array -- Normally, I would've broken them up into different functions, but it was
// easier for me to do it all inside the one array for this assignment.
const mainQuestions = () => {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'mainMenu',
      message: 'What would you like to do?',
      choices: ['View all departments', 'View all roles', 'View all employees','View employees within department(Bonus)', 'View employees by Manager(Bonus)','Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Exit the application']
    },
    {
      type: 'rawlist',
      name: 'view_Dept',
      message: 'View employees from which department?',
      choices: defaultDeptChoices,
      when: ({ mainMenu }) => (mainMenu === 'View employees within department(Bonus)'),
    },
    {
      type: 'input',
      name: 'view_Manager',
      message: 'View employees reporting to which manager ID?',
      when: ({ mainMenu }) => (mainMenu === 'View employees by Manager(Bonus)'),
    },
    {
      type: 'input',
      name: 'newDepartment',
      message: 'What is the name of your new department?',
      when: ({ mainMenu }) => (mainMenu === 'Add a department'),
      validate: deptInput => {
        if (deptInput) {
          return true;
        } else {
          console.log('You need to enter some department name');
          return false;
        }
      }
    }
    , {
      type: 'input',
      name: 'newRoleTitle',
      message: 'What is the name of your new role?',
      when: ({ mainMenu }) => (mainMenu === 'Add a role'),
      validate: roleInput => {
        if (roleInput) {
          return true;
        } else {
          console.log('You need to enter some role name');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'newRoleSalary',
      message: 'What is the salary of your new role?',
      when: ({ mainMenu }) => (mainMenu === 'Add a role'),
      validate: roleInput => {
        if (roleInput) {
          return true;
        } else {
          console.log('You need to enter some salary');
          return false;
        }
      }
    },
    {
      type: 'rawlist',
      name: 'newRoleDeptID',
      message: 'What department are you assigning?',
      choices: defaultDeptChoices,
      when: ({ mainMenu }) => (mainMenu === 'Add a role'),
    },
    {
      type: 'input',
      name: 'newfirst_name',
      message: 'What is your new employee first name?',
      when: ({ mainMenu }) => (mainMenu === 'Add an employee'),
      validate: first_name => {
        if (first_name) {
          return true;
        } else {
          console.log('You need to enter the first name');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'newlast_name',
      message: 'What is your new employee last name?',
      when: ({ mainMenu }) => (mainMenu === 'Add an employee'),
      validate: last_name => {
        if (last_name) {
          return true;
        } else {
          console.log('You need to enter the last name');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'newEmpl_role_id',
      message: 'What is your new employee role ID?',
      when: ({ mainMenu }) => (mainMenu === 'Add an employee')
      
    },
    {
      type: 'input',
      name: 'newEmpl_manager_id',
      message: 'What is your new employee manager ID?',
      when: ({ mainMenu }) => (mainMenu === 'Add an employee')
    },
    {
      type: 'input',
      name: 'updateEmployeeID',
      message: 'Which employee ID are you wanting to update?',
      when: ({ mainMenu }) => (mainMenu === 'Update an employee role'),
    },
    {
      type: 'input',
      name: 'updateEmployeeRoleID',
      message: 'Which role ID do you want to change into?',
      when: ({ mainMenu }) => (mainMenu === 'Update an employee role'),
    }

  ])
    .then(function (answers) {
      // Here's where I parse the answers into the individual functions
      switch (answers.mainMenu) {
        case 'View all departments': {
          viewDepartments()
          break;
        }
        case 'View all roles': {
          viewRoles()
          break;
        }
        case 'View all employees': {
          viewEmployees()
          break;
        }
        case 'View employees within Department(Bonus)': {
          //console.log(answers.view_Dept);
          viewEmployeesByDepartment(answers.view_Dept);
          break;
        }
        case 'View employees by Manager(Bonus)':{
          viewEmployeesByManager(answers.view_Manager);
          break;
        }
        case 'Add a department': {
          addDepartment(answers.newDepartment)
          break;
        }
        case 'Add a role': {
          //console.log(answers.newRoleTitle, answers.newRoleSalary,answers.newRoleDeptID);
          addRole(answers.newRoleTitle, answers.newRoleSalary,answers.newRoleDeptID);
          break;
        }
        case 'Add an employee': {
          addEmployee(answers.newfirst_name, answers.newlast_name, answers.newEmpl_role_id, answers.newEmpl_manager_id);
          break;
        }
        case 'Update an employee role': {
           //console.log(answers.updateEmployeeID, answers.updateEmployeeRoleID); 
           updateEmployee(answers.updateEmployeeID, answers.updateEmployeeRoleID)
           break; }
        case 'Use bonus features': { console.log('Bonus'); break; }
        case 'Exit the application': { console.log('Bye'); break; }

        default: {
          console.log('Error in switch/case logic mainQuestions')
        }
      }
    })
}


module.exports = {
  init
}
