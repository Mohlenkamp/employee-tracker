// This is the file where I'll put all the db functions
const questions = require('./Questions')
const db = require('../db/connection'); 
const mysql = require('mysql2/promise')

// Database Functions

function getAllEmployees() {
    let data = db.promise().query(
      "SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee e LEFT JOIN role r on e.role_id = r.id LEFT JOIN department d on r.department_id = d.id LEFT JOIN employee m on m.id = e.manager_id;"
    );
    return data;
  }

function getEmployeesByDepartment(department='') {
    let data = db.promise().query(`SELECT e.first_name, e.last_name, r.title, d.name as 'department'
                FROM employee e, department d, role r
                WHERE e.role_id = r.id
                and r.department_id = d.id
                and d.name = ?`,[department]); 
    return data;
}

function getAllDepartments() {
    let data = db.promise().query(
        "SELECT DISTINCT name as 'Departments' FROM department;"
      );
      return data;
    }

function getAllRoles(){
    let data = db.promise().query(
        "SELECT DISTINCT title as 'Roles' FROM role;"
      );
      return data;
    }

function insertDepartment(newDepartment=''){
        let data = db.promise().execute(
            "INSERT INTO department (name) VALUES (?);", ([newDepartment])
          );
          return data;
        }

function insertRole(newRole='', newSalary=''){
        let data = db.promise().execute(
            "INSERT INTO role (title, salary) VALUES (?, ?);", ([newRole, newSalary])
              );
              return data;
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
     insertDepartment,
     insertRole
    }