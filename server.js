// Requires
const inquirer = require('inquirer'); //Inquirer
const db = require('./db/connection');
const cTable = require('console.table');
const questions = require('./utils/Questions')
const mysql = require('mysql2')
const figlet = require('figlet')
const { getAllEmployees,
  getEmployeesByDepartment,
  getAllDepartments,
  getAllRoles,
  getEmployeeByID,
  getEmployeeByID2,
} = require('./utils/dbUtils')

async function init(){
  figlet('Employee Tracker', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});
}

const mainQuestions = () => {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'mainMenu',
      message: 'What would you like to do?',
      choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Use bonus features', 'Exit the application']
    }
  ])
    .then(function (answers) {
      switch (answers.mainMenu) {
        case 'View all departments': {
          getAllDepartments()

          mainQuestions();
          break;
        }
        case 'View all roles': {
          getAllRoles()
            .then(function (data) {
              mainQuestions()
            })
          break;
        }
        case 'View all employees': {
          getAllEmployees()
            .then(function (data) {
              mainQuestions()
            })
          break;
        }
        case 'Add a department': { console.log('Add Dept'); break; }
        case 'Add a role': { console.log('Add role'); break; }
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

const promptTeam = team => {
  // console.log('Add a team member')
  return inquirer.prompt([
    {
      type: 'rawlist',
      name: 'choice',
      message: 'What would you like to do?',
      choices: ['Add an Engineer to the team', 'Add an Intern to the team', "I'm finished adding to the team"]
    }])
    .then(menu => {
      //   console.log(menu.choice)
      switch (menu.choice) {
        case 'Add an Engineer to the team': {
          addEngineer()
            .then(function (data) {
              addTeamMember('Engineer', data, team)
              promptTeam(team)
            });
          break;
        }
        case 'Add an Intern to the team': {
          addIntern()
            .then(function (data) {
              addTeamMember('Intern', data, team)
              promptTeam(team)
            });
          break;
        }
        case "I'm finished adding to the team": {
          console.log("Generating HTML file")
          writeToFile(generateHTML(team))
          break;
        }
        default: console.log('Error in promptTeam switch/case logic');
      }
    })
    .catch(err => {
      console.log(err);
    });
}

// Main Program

init()
   .then (function (data){
    mainQuestions()
       })
   .catch(err => {
     console.log(err);
   });






// async function init() {
//   let answers = await inquirer.prompt(mainQuestions)
//       .then (function(answers){ 
//         switch (answers.mainMenu){
//           case 'View all departments': {getAllDepartments(); break;}
//           case 'View all roles': {getAllRoles();  break;}
//           case 'View all employees': {getAllEmployees(); ; break;}
//           case 'Add a department': {console.log('Add Dept'); break;}
//           case 'Add a role': {console.log('Add role'); break;}
//           case 'Add an employee': {console.log('Add employee'); break;}
//           case 'Update an employee role': {console.log('Update Role'); break;}
//           case 'Use bonus features': {console.log('Bonus'); break;}
//           case 'Exit the application': {console.log('Quit'); break;}

//           default: {console.log('Error in switch/case logic mainQuestions')}
//         }
//         // await answers 
//         //   .then init()
//       })
// };



// .then (function(answers){
// console.log(answers.mainMenu);
// questions.mainQuestions();
// switch (answers.mainMenu){
//   //case 'View all departments': {getAllDepartments(); questions.mainQuestions(); break;}
//   case 'View all roles': {getAllRoles(); break;}
//   case 'View all employees': {getAllEmployees(); break;}
//   case 'Add a department': {console.log('Add Dept'); break;}
//   case 'Add a role': {console.log('Add role'); break;}
//   case 'Add an employee': {console.log('Add employee'); break;}
//   case 'Update an employee role': {console.log('Update Role'); break;}
//   case 'Use bonus features': {console.log('Bonus'); break;}
//   case 'Exit the application': {console.log('Quit'); break;}

//   default: {console.log('Error in switch/case logic mainQuestions in server.js')
// }}
// })
//console.log(mainMenu.choices)
//getAllEmployees()
//getEmployeesByDepartment('IT')

// 


