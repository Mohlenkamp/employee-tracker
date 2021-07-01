// Requires
const inquirer = require('inquirer'); //Inquirer
const db = require('./db/connection');
const cTable = require('console.table');
const questions = require('./utils/Questions')
const {init, seedDC, seedEC, seedRC} = require('./utils/Questions')
const mysql = require('mysql2')


// Main Program

// These 3 functions will setup the choices array for the employees, roles, and departments
seedEC()
seedRC()
seedDC()
// start here
init()




