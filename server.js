// Requires
const inquirer = require('inquirer'); //Inquirer
const db = require('./db/connection');  
const cTable = require('console.table');
const questions = require('./utils/Questions')
const mysql = require('mysql2')

const { getAllEmployees,
        getEmployeesByDepartment,
        getAllDepartments,
        getAllRoles,
        getEmployeeByID, 
        getEmployeeByID2,
      } = require('./utils/dbUtils')

// Main program
// Start server after DB connection
db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
  //getAllEmployees()
  //getEmployeesByDepartment('IT')
});
