// Requires
const inquirer = require('inquirer'); //Inquirer
const db = require('./db/connection');  
const cTable = require('console.table');
const questions = require('./utils/Questions')


// Start server after DB connection
db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
});
