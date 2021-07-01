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
  updateEmployeeRole,
  updateEmployeeManager,
  getBudgetForDepartment,
  deleteDepartment,
  deleteRole,
  deleteEmployee
} = require('../utils/dbUtils')

let employeeChoices = [];
let departmentChoices =[];
let roleChoices = [];

// Seeding Question Choices in case the user doesn't view the data first.
// This became necessary when I tested updating an employee before I
// viewed all the employees first.
function seedEC () {
  //Employee Choices
getAllEmployees()
.then(([rows]) => {
  employeeChoices.length = 0;  //clear and reset employee choices
  for (i=0; i<rows.length; i++){
    employeeChoices[i] = {
      "name": rows[i].first_name + ' ' + rows[i].last_name,
      "value": rows[i].id
    }}})}

function seedDC () {
  //Department Choices
  getAllDepartments()
  .then(([rows]) => {
    departmentChoices.length = 0;  //clear and reset employee choices
    for (i=0; i<rows.length; i++){
      departmentChoices[i] = {
        "name": rows[i].Departments,
        "value": rows[i].id
      }}})}

function seedRC() {
  //Role Choices
  getAllRoles()
  .then(([rows]) => {
    roleChoices.length = 0;  //clear and reset employee choices
    for (i=0; i<rows.length; i++){
      roleChoices[i] = {
        "name": rows[i].Roles,
        "value": rows[i].id
      }}})}

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
      employeeChoices.length = 0;  //clear and reset employee choices
      for (i=0; i<rows.length; i++){
        employeeChoices[i] = {
          "name": rows[i].first_name + ' ' + rows[i].last_name,
          "value": rows[i].id
        }
      }
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
      departmentChoices.length = 0;  //clear and reset employee choices
      for (i=0; i<rows.length; i++){
        departmentChoices[i] = {
          "name": rows[i].Departments,
          "value": rows[i].id
        }
      }
      let department = rows;
      console.log("\n");
      console.table(department);
    })
    .then(() => mainQuestions());
}

function viewDepartmentBudget(dept_id) {
  // Bonus function 5 - View budget for a department
  getEmployeesByDepartment(dept_id)
  .then(([rows]) => {
    let employees = rows;
    console.log("\n");
    console.table(employees);
  })
  .then (() => getBudgetForDepartment(dept_id))
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
      roleChoices.length = 0;  //clear and reset employee choices
      for (i=0; i<rows.length; i++){
        roleChoices[i] = {
          "name": rows[i].Roles,
          "value": rows[i].id
        }
      }
      let roles = rows;
      console.log("\n");
      console.table(roles);
    })
    .then(() => mainQuestions());
}

function addDepartment(department) {
  // Required function 4 - Add a department
  insertDepartment(department);
//  currentDepartmentCount++ deprecated b/c I'm resetting the array in the viewDepartments()
  // departmentChoices.push({
  //   'name': department,
  //   'value': currentDepartmentCount
  viewDepartments();
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

function changeEmployeeRole(employee_id, role_id) {
  // Required function 7 - Update an employee's role
  updateEmployeeRole(employee_id, role_id)
  .then (() => viewEmployees())
}

function changeEmployeeManager(employee_id, manager_id) {
  // Bonus function 1 - Update an employee's manager
  updateEmployeeManager(employee_id, manager_id)
  .then (() => viewEmployees())
}

function removeDepartment(dept_id){
  // Bonus function 4.1 - Remove a department
  deleteDepartment(dept_id)
  .then (() => viewDepartments())
}

function removeRole(role_id){
  // Bonus function 4.2 - Remove a role
  deleteRole(role_id)
  .then (() => viewRoles())
}

function removeEmployee(employee_id){
  // Bonus function 4.3 - Remove an employee
  deleteEmployee(employee_id)
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
      choices: ['View all departments', 'View all roles', 'View all employees','View employees within Department(Bonus)', 'View employees by Manager(Bonus)', 'View total utilized budget(Bonus)', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Update an employee manager(Bonus)', 'Delete Department(Bonus)','Delete Role(Bonus)','Delete Employee(Bonus)','Exit the application']
    },
    {
      type: 'list',
      name: 'chooseDepartment',
      message: 'Delete which department?',
      choices: departmentChoices,
      when: ({ mainMenu }) => (mainMenu === 'Delete Department(Bonus)'),
    },
    {
      type: 'list',
      name: 'chooseEmployee',
      message: 'Choose employee',
      choices: employeeChoices,
      when: ({ mainMenu }) => (mainMenu === 'Delete Employee(Bonus)')

    },
    {
      type: 'list',
      name: 'chooseRole',
      message: 'Which role do you want to delete?',
      choices: roleChoices,
      when: ({ mainMenu }) => (mainMenu === 'Delete Role(Bonus)')
    },
    {
      type: 'list',
      name: 'chooseDepartment',
      message: 'View employees from which department?',
      choices: departmentChoices,
      when: ({ mainMenu }) => (mainMenu === 'View employees within Department(Bonus)')
    },
    {
      type: 'list',
      name: 'chooseEmployee',
      message: 'View employees reporting to which manager ID?',  //There's no spec about who manages who, so it can be anyone
      choices: employeeChoices,
      when: ({ mainMenu }) => (mainMenu === 'View employees by Manager(Bonus)')
    },
    {
      type: 'list',
      name: 'chooseDepartment',
      message: 'View budget from which department?',
      choices: departmentChoices,
      when: ({ mainMenu }) => (mainMenu === 'View total utilized budget(Bonus)')
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
      type: 'list',
      name: 'chooseDepartment',
      message: 'What department are you assigning to this new role?',
      choices: departmentChoices,
      when: ({ mainMenu }) => (mainMenu === 'Add a role')
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
      type: 'list',
      name: 'chooseRole',
      message: 'What is your new employee role?',
      choices: roleChoices,
      when: ({ mainMenu }) => (mainMenu === 'Add an employee')
      
    },
    {
      type: 'list',
      name: 'chooseEmployee',
      message: 'Who is managing your new employee?',
      choices: employeeChoices,
      when: ({ mainMenu }) => (mainMenu === 'Add an employee')
    },
    {
      type: 'list',
      name: 'chooseEmployee',
      message: 'Which employee ID are you wanting to update?',
      choices: employeeChoices,
      when: ({ mainMenu }) => (mainMenu === 'Update an employee role')
    },
    {
      type: 'list',
      name: 'chooseRole',
      message: 'Which role do you want to change into?',
      choices: roleChoices,
      when: ({ mainMenu }) => (mainMenu === 'Update an employee role')
    },
    {
      type: 'list',
      name: 'chooseEmployee',
      message: 'Which employee ID are you wanting to update?',
      choices: employeeChoices,
      when: ({ mainMenu }) => (mainMenu === 'Update an employee manager(Bonus)')
    },
    {
      type: 'list',
      name: 'chooseEmployee2',
      message: 'Which person do you want to be their manager?',
      choices: employeeChoices,
      when: ({ mainMenu }) => (mainMenu === 'Update an employee manager(Bonus)')
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
          viewEmployeesByDepartment(answers.chooseDepartment);
          break;
        }
        case 'View employees by Manager(Bonus)':{
          viewEmployeesByManager(answers.chooseEmployee);
          break;
        }
        case  'View total utilized budget(Bonus)':{
          viewDepartmentBudget(answers.chooseDepartment);
          break;
        }
        case 'Add a department': {
          addDepartment(answers.newDepartment)
          break;
        }
        case 'Add a role': {
          //console.log(answers.newRoleTitle, answers.newRoleSalary,answers.newRoleDeptID);
          addRole(answers.newRoleTitle, answers.newRoleSalary,answers.chooseDepartment);
          break;
        }
        case 'Add an employee': {
          addEmployee(answers.newfirst_name, answers.newlast_name, answers.chooseRole, answers.chooseEmployee);
          break;
        }
        case 'Update an employee role': {
           //console.log(answers.updateEmployeeID, answers.updateEmployeeRoleID); 
           changeEmployeeRole(answers.chooseEmployee, answers.chooseRole)
           break; 
          }
        case 'Update an employee manager(Bonus)': { 
          //console.log(answers.updateEmployeeID, answers.updateEmployeeManagerID); 
          changeEmployeeManager(answers.chooseEmployee, answers.chooseEmployee2)
          break; 
        }
        case 'Delete Department(Bonus)':{
          removeDepartment(answers.chooseDepartment);
          break;
        }
        case 'Delete Role(Bonus)':{
          removeRole(answers.chooseRole);
          break;
        }
        case 'Delete Employee(Bonus)':{
          //console.log(answers.chooseEmployee)
          removeEmployee(answers.chooseEmployee);
          break;
        }
        case 'Exit the application': { 
          console.log('Bye'); 
          process.exit();
          //break; 
        }

        default: {
          console.log('Error in switch/case logic mainQuestions')
        }
      }
    })
}


module.exports = {
  init,
  seedEC,
  seedDC,
  seedRC
}
