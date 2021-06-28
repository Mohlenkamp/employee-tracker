// This is the file where I'll put all the db functions
const questions = require('./Questions')
const db = require('../db/connection'); 

// Database Functions

function getAllEmployees() { 
    db.query(`SELECT e.id, e.first_name, e.last_name, r.title, d.name as 'department', r.salary, CONCAT(m.first_name, ' ', m.last_name) AS 'manager'
                FROM employee e
                LEFT JOIN employee m ON m.id = e.manager_id, department d, role r
                WHERE e.role_id = r.id
                and r.department_id = d.id`, (err, rows) => {
        if (err) {throw err}
        else
            {console.table(rows);
            return true};
    })};

function getEmployeesByDepartment(department='') {
    console.log(department) 
    db.query(`SELECT e.first_name, e.last_name, r.title, d.name as 'department'
                FROM employee e, department d, role r
                WHERE e.role_id = r.id
                and r.department_id = d.id
                and d.name = ?`,[department], (err, rows) => {
        if (err) {throw err}
        else{
            {console.table(rows);
            return true};
    }})};

function getAllDepartments() {
    db.query(`SELECT DISTINCT name as 'Departments' FROM department`, (err, rows) => {
   if (err) {throw err}
    else{
        return console.table(rows)}
    })};

function getAllRoles()
{db.query(`SELECT DISTINCT title as 'Roles' FROM role`, (err, rows) => {
    if (err) {throw err}
     else{
        {console.table(rows);
            return true};
 }})};

 const getEmployeeByID2 = id => {
console.log (id)
db.query(`SELECT e.first_name as First, e.last_name as Last, r.title as Title, r.salary as Salary, d.name as Department FROM employee e, role r, department d WHERE e.id = ? and e.role_id = r.id and r.department_id = d.id`, [id],(err, rows) => {
    if (err) throw err;
    console.table(rows);
})
 }

const getEmployeeByID = id => { 

        db.query(`SELECT e.*, r.*, d.* FROM employee e, role r, department d where e.role_id = r.id and r.department_id = d.id and e.id = ` + id, (err, rows) => {
            if (err) throw err;
            console.table(rows);
        })
    }




 module.exports = {
     getAllEmployees,
     getEmployeesByDepartment,
     getAllRoles,
     getAllDepartments,
     getEmployeeByID,
     getEmployeeByID2
    }