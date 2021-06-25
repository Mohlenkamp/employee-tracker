// Requires
const inquirer = require('inquirer'); //Inquirer
const db = require('./db/connection');  
const cTable = require('console.table');
const questions = require('./utils/Questions')
const express = require('express');
const apiRoutes = require('./routes/apiRoutes');

// Express middleware requirements
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use(express.static('public')); -- Not needed b/c this is command line

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
