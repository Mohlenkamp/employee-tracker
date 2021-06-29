// This is the utility file to ask the main questions at the beginning

// Requires
const inquirer = require('inquirer'); //Inquirer
const { getAllEmployees,
  getEmployeesByDepartment,
  getAllDepartments,
  getAllRoles,
  getEmployeeByID, 
  getEmployeeByID2,
} = require('../utils/dbUtils')
// Question arrays

const mainQuestions2 = () => {
    inquirer.prompt([
    {
        type: 'list',
        name: 'mainMenu',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all roles','View all employees', 'Add a department','Add a role','Add an employee', 'Update an employee role', 'Use bonus features', 'Exit the application']
    }
    ])
    .then (function(answers){ 
      switch (answers.mainMenu){
      case 'View all departments': {getAllDepartments(); mainQuestions(); break;}
      case 'View all roles': {getAllRoles(); mainQuestions(); break;}
      case 'View all employees': {getAllEmployees(); mainQuestions(); break;}
      case 'Add a department': {console.log('Add Dept'); break;}
      case 'Add a role': {console.log('Add role'); break;}
      case 'Add an employee': {console.log('Add employee'); break;}
      case 'Update an employee role': {console.log('Update Role'); break;}
      case 'Use bonus features': {console.log('Bonus'); break;}
      case 'Exit the application': {console.log('Quit'); break;}

  default: {console.log('Error in switch/case logic mainQuestions')
}}})
    return false;
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
    ])}












module.exports = {
    mainQuestions2,
    addEmployee
}
