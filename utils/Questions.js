// This is the utility file to ask the main questions at the beginning

// Requires
const inquirer = require('inquirer'); //Inquirer
const db = require('../db/connection');
const figlet = require('figlet'); //opening title 
const { getAllEmployees,
  getEmployeesByDepartment,
  getAllDepartments,
  getAllRoles,
  getEmployeeByID,
  insertDepartment,
  insertRole
} = require('../utils/dbUtils')

let defaultDeptChoices =[]
defaultDeptChoices.push({
  'name': 'Administration',
  'value': '1'
}, {
  'name': 'Human Resources',
  'value': '2'
}, {
    'name': 'Accounting',
    'value': '3'
}, {
  'name': 'Sales',
  'value': '4'
}, {
  'name': 'Production',
  'value': '5'
}, {
  'name': 'Customer Relations',
  'value': '6'
}, {
  'name': 'IT',
  'value': '7'
}, {
  'name': 'Legal',
  'value': '8'
}, {
  'name': 'Resource Pool',
  'value': '9'
}
);



// Functions



function init() {
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
  getAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.log("\n");
      console.table(employees);
    })
    .then(() => mainQuestions());
}

function departmentChoices(deptChoices) {
  getAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      for (i = 0; 1 < departments.length; i++) {
        let deptID = getIdByDepartment(departments[i])
        console.log(departments[1], deptID)
        deptChoices.push({
          "name": departments[i],
          "value": departments[i]
        })
      }
    })
};

function viewDepartments() {
  getAllDepartments()
    .then(([rows]) => {
      let department = rows;
      console.log("\n");
      console.table(department);
    })
    .then(() => mainQuestions());
}

function viewRoles() {
  getAllRoles()
    .then(([rows]) => {
      let roles = rows;
      console.log("\n");
      console.table(roles);
    })
    .then(() => mainQuestions());
}

function addDepartment(department) {
  insertDepartment(department)
  defaultDeptChoices.push({
    'name': department,
    'value': getIdByDepartment(department)
  })
  viewDepartments()
}

function addRole(title, salary, department_id) {
  console.log(title, salary, Promise.resolve(department_id))
  insertRole(title, salary, department_id)
  viewRoles()
}


// Question arrays
const mainQuestions = () => {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'mainMenu',
      message: 'What would you like to do?',
      choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Use bonus features', 'Exit the application']
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
    }
  ])
    .then(function (answers) {
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
        case 'Add a department': {
          addDepartment(answers.newDepartment)
          break;
        }
        case 'Add a role': {
          // The spec did not say anything about a default department,
          // so we'll leave that for a later update
          console.log(answers.newRoleTitle, answers.newRoleSalary)
          addRole(answers.newRoleTitle, answers.newRoleSalary);
          break;
        }
        case 'Add an employee': { console.log('Add employee'); break; }
        case 'Update an employee role': { console.log('Update Role'); break; }
        case 'Use bonus features': { console.log('Bonus'); break; }
        case 'Exit the application': { console.log('Quit'); break; }

        default: {
          console.log('Error in switch/case logic mainQuestions')
        }
      }
    })
}

const addADepartment = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'newDepartment',
      message: 'What is the name of your new department?',
      validate: deptInput => {
        if (deptInput) {
          return true;
        } else {
          console.log('You need to enter some department name');
          return false;
        }
      }
    }
  ])
    .then(function (answer) {
      insertDepartment(answer)
      defaultDeptChoices.push({
        'name': answer,
        'value': answer
      })
    })
}


const addEmployee = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: 'What is the employees FIRST name? (Required)',
      validate: firstName => {
        if (firstName) {
          return true;
        } else {
          console.log('You need to enter the employee first name!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'What is the employees LAST name? (Required)',
      validate: lastName => {
        if (lastName) {
          return true;
        } else {
          console.log('You need to enter the employee last name!');
          return false;
        }
      }
    }
  ])
}












module.exports = {
  init
}
