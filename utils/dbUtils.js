// This is the file where I'll put all the db functions
const questions = require('./Questions')
const db = require('../db/connection'); 
const mysql = require('mysql2')

// Database Functions

function getAllEmployees() {
    // Used explicit joins on this to prove I understood
    // but I'm using implicit for most/all of the remainder because I like it better.
    let data = db.promise().query(
      "SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee e LEFT JOIN role r on e.role_id = r.id LEFT JOIN department d on r.department_id = d.id LEFT JOIN employee m on m.id = e.manager_id;"
    );
    return data;
  }

function getEmployeesByDepartment(dept_id ='') {
    let data = db.promise().query(`SELECT e.id, e.first_name, e.last_name, r.title, d.name as 'department'
                FROM employee e, department d, role r
                WHERE e.role_id = r.id
                and r.department_id = d.id
                and d.id = ?`,[dept_id]); 
    return data;
}

function getAllDepartments() {
    let data = db.promise().query(
        "SELECT id, name as 'Departments' FROM department;"
      );
      return data;
    }

function getAllRoles(){
    let data = db.promise().query(
        "SELECT id, title as 'Roles', salary, department_id FROM role;"
      );
      return data;
    }

function insertDepartment(newDepartment=''){
        let data = db.promise().execute(
            "INSERT INTO department (name) VALUES (?);", ([newDepartment])
          );
          return data;
        }

function insertRole(newRole='', newSalary='', newDepartment=''){
        let data = db.promise().execute(
            "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);", ([newRole, newSalary, newDepartment])
              );
              return data;
            }

function insertEmployee(first_name='', last_name='', role_id='', manager_id='' ){
        let data = db.promise().execute(
            "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);", ([first_name, last_name, role_id, manager_id])
            );
            return data;
         }

function updateEmployeeRole(employee_id, role_id=''){
            let data = db.promise().execute(
                "UPDATE employee SET role_id = ? WHERE id = ?;", ([role_id, employee_id])
                );
                return data;
             }

function getEmployeeByManagerID(manager_id=''){ 
        let data = db.promise().query(
            "SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager" +
            " FROM employee e" +
            " LEFT JOIN role r on e.role_id = r.id" +
            " LEFT JOIN department d on r.department_id = d.id" +
            " LEFT JOIN employee m on m.id = e.manager_id" +
            " WHERE e.manager_id = ?", [manager_id]); 
        return data;
    }




 module.exports = {
     getAllEmployees,
     getEmployeesByDepartment,
     getAllRoles,
     getAllDepartments,
     getEmployeeByManagerID,
     insertDepartment,
     insertRole,
     insertEmployee,
     updateEmployeeRole
    }