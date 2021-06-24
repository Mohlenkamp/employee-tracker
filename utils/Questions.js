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
        choices: ['Update employee managers', 'View employees by manager','View employees by department', 'Delete a department', 'Delete a role', 'Delete an employee', 'View total budget of a department', 'Exit the application'],
        when: (main-menubar.choices[0]==='Use bonus features')
    }
])}












module.exports = {
    mainQuestions
}
