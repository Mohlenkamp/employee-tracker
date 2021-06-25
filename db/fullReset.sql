-- To save time, combining db.sql, schema.sql, and seed.sql into
-- one script so I can do a fast full reset

DROP DATABASE IF EXISTS emplytracker;
CREATE DATABASE emplytracker;
USE emplytracker;

/* Schema create for project */

DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS employees;


CREATE TABLE department (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE role (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL (19,2) NOT NULL,  -- I know the GAAP is (19,4) but we're not rounding
  department_id INTEGER,
  CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
);

CREATE TABLE employee (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER,
    manager_id INTEGER DEFAULT NULL,
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES role(id) ON DELETE SET NULL
);

-- Seed data into tables

INSERT INTO department (name)
VALUES
('Administration'),
('Human Resources'),
('Accounting'),
('Sales'),
('Production'),
('Customer Relations'),
('IT'),
('Legal'),
('Resource Pool');

INSERT INTO role (title, salary, department_id)
VALUES
('Manager', 100000.00, 1),
('Manager', 100000.00, 2),
('Manager', 100000.00, 3),
('Manager', 100000.00, 4),
('Manager', 100000.00, 5),
('Manager', 100000.00, 6),
('Manager', 100000.00, 7),
('Manager', 100000.00, 8),
('Director', 150000.00, 1),
('Executive', 125000.00, 1),
('Assistant', 60000.00, 1),
('Talent Scout', 55000.00, 2),
('Interviewer', 57500.00, 2),
('Assistant', 44250.00,2),
('CPA', 90000.00, 3),
('Staff Accountant', 72500.00,3),
('Clerk', 48750.00, 3),
('Regional Director', 90000, 4),
('Local Director', 80000, 4),
('Senior Sales Rep', 70000, 4),
('Junior Sales Rep', 45000, 4),
('Senior Production Engineer', 110000, 5),
('Production Engineer', 95000.00, 5),
('Junior Production Engineer', 70000.00, 5),
('Journeyman Apprentice', 55000.00, 5),
('Front Office Support', 43800.00, 6),
('Telephone Support', 43750.00, 6),
('Media Relations', 58825.00, 6),
('Architect', 120000, 7),
('Senior Developer', 98900.00, 7),
('Developer', 77777.00, 7),
('Systems Engineer', 88888.00, 7),
('Apprentice', 55555.55, 7),
('General Counsel', 175000, 8),
('Staff Counsel', 125000, 8),
('Paralegal', 80000,8),
('Legal Assistant', 55000,8),
('Employee', 41414.14, 9);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Virginia', 'Woolf', 1, 1),
    ('Piers', 'Gaveston', 2, 1),
    ('Charles', 'LeRoi', 3, 1),
    ('Katherine', 'Mansfield', 4, 1),
    ('Dora', 'Carrington', 5, 1),
    ('Edward', 'Bellamy', 6, 1),
    ('Montague', 'Summers', 7, 1),
    ('Octavia', 'Butler', 8, 1),
    ('Unica', 'Zurn', 9, 1),
    ('Blanche','Capella', 10, 1),
    ('Bernice','Blackman', 11, 1),
    ('Delorse','Rundle', 12, 2),
    ('Teisha','Constance', 13, 2),
    ('Treva','Cuyler', 14, 2),
    ('Marita','Klingler', 15, 3),
    ('Rocio', 'Ryberg', 16, 3),
    ('Ana','Anding', 17, 3),
    ('Denise','Cruickshank', 18, 4),
    ('Raeann','Bailey', 19, 4),
    ('Eusebia','Ratledge', 20, 4),
    ('Thea','Behrends', 21, 4),
    ('Dulcie','Studstill', 22, 5), 
    ('Vergie','Carignan', 23, 5),
    ('Douglass','Poche', 24, 5),
    ('Violeta','Coffelt', 25, 5),
    ('Lavonne','Lovato', 26, 6),
    ('Min','Cartlidge', 27, 6),
    ('Nicholas','Cue', 28, 6),
    ('Helena','Biro', 29, 7),
    ('Cristie','Davy', 30, 7),
    ('Brande','Elzey', 31, 7),
    ('Micah','Corkill', 32, 7),
    ('Lawrence','Bernett', 33,7),
    ('Elizabeth', 'Miller', 34, 8),
    ('Jaime','Anguiano', 35, 8),
    ('Rupert','Forness', 36, 8),
    ('Jules','Bee', 37, 8),
    ('Faustino','Kavanagh', 38, NULL),
    ('Myung','Golson', 38, NULL),
    ('Desire','Cullins', 38, NULL),
    ('Miguel','Maes', 38, NULL),
    ('Vince','Kester', 38, NULL),
    ('Francine','Batton', 38, NULL),
    ('Taneka','Loomis', 38, NULL),
    ('Bao','Laughridge', 38, NULL);
  
