// This is the utility file to ask the main questions at the beginning

// Requires
const inquirer = require('inquirer'); //Inquirer


// Question arrays

const mainQuestions = () => {
    return inquirer.prompt([
    {
        type: 'rawlist',
        name: 'main-menu',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all roles','View all employees', 'Add a department','Add a role','Add an employee', 'Update an employee role', 'Use bonus features', 'Exit the application']
    },
    {
        type: 'rawlist',
        name: 'bonus-menu',
        message: 'What would you like to do?',
        choices: ['Update employee managers', 'View employees by manager','View employees by department', 'Delete a department', 'Delete a role', 'Delete an employee', 'View total budget of a department', 'Return to Main Menu', 'Exit the application'],
        when: (main-menubar.choices[0]==='Use bonus features')
    }
])}

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
    mainQuestions,
    addEmployee
}
