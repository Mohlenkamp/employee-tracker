// Requires
const inquirer = require('inquirer'); //Inquirer
const questions = require('./utils/Questions')
const express = require('express');
const apiRoutes = require('./routes/apiRoutes');

// Express middleware requirements
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Use apiRoutes
app.use('/api', apiRoutes);

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

// Start server after DB connection
db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});








// Main Program

let cms = []
managerQuestions()
    .then (function (data){
console.log(data);        })
    .catch(err => {
      console.log(err);
    });