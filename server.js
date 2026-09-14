const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/employees", require("./routes/employees"));
app.use("/api/departments", require("./routes/departments"));
app.use("/api/timeoff", require("./routes/timeoff"));

app.get("/", (req, res) =>
  res.json({ message: "ModernTech HR API Running on port 5000" }),
);

// Setup DB tables automatically
const pool = require("./config/db");
async function initDB() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS departments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        location VARCHAR(100) NOT NULL,
        budget DECIMAL(12,2) DEFAULT 500000
      )
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role ENUM('admin','hr','manager') DEFAULT 'admin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS employees (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        job_title VARCHAR(100) NOT NULL,
        department_id INT,
        salary DECIMAL(10,2) NOT NULL,
        hire_date DATE NOT NULL,
        FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
      )
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS time_off_requests (
        id INT AUTO_INCREMENT PRIMARY KEY,
        employee_id INT NOT NULL,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        reason TEXT NOT NULL,
        status ENUM('pending','approved','rejected') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
      )
    `);
    console.log("Tables ready in 3NF");

    // Seed departments
    const [depts] = await pool.query("SELECT COUNT(*) as c FROM departments");
    if (depts[0].c === 0) {
      await pool.query(`INSERT INTO departments (name,location) VALUES
        ('Software Development','Cape Town'),('Quality Assurance','Cape Town'),
        ('Customer Support','Johannesburg'),('Sales','Durban'),
        ('Marketing','Cape Town'),('Human Resources','Johannesburg')`);
    }
    // Seed 15 employees if empty
    const [emps] = await pool.query("SELECT COUNT(*) as c FROM employees");
    if (emps[0].c === 0) {
      await pool.query(`INSERT INTO employees (first_name,last_name,email,job_title,department_id,salary,hire_date) VALUES
        ('Thabo','Mbeki','thabo@moderntech.com','Senior Developer',1,75000,'2022-01-15'),
        ('Sarah','Johnson','sarah@moderntech.com','QA Engineer',2,55000,'2022-03-10'),
        ('Lerato','Nkosi','lerato@moderntech.com','Support Lead',3,48000,'2021-11-20'),
        ('David','Smith','david@moderntech.com','Sales Manager',4,62000,'2020-06-01'),
        ('Nomsa','Dlamini','nomsa@moderntech.com','Marketing Specialist',5,50000,'2023-02-14'),
        ('James','Wilson','james@moderntech.com','Junior Developer',1,45000,'2023-05-01'),
        ('Aisha','Patel','aisha@moderntech.com','HR Officer',6,52000,'2021-08-12'),
        ('Chris','Brown','chris@moderntech.com','DevOps Engineer',1,68000,'2020-09-30'),
        ('Zanele','Khumalo','zanele@moderntech.com','Customer Success',3,42000,'2022-07-19'),
        ('Michael','Lee','michael@moderntech.com','Product Manager',1,80000,'2019-04-22'),
        ('Priya','Naidoo','priya@moderntech.com','UX Designer',5,58000,'2022-10-05'),
        ('Sipho','Zulu','sipho@moderntech.com','Support Agent',3,35000,'2023-01-10'),
        ('Emma','Williams','emma@moderntech.com','QA Lead',2,60000,'2021-02-28'),
        ('Kagiso','Molefe','kagiso@moderntech.com','Sales Rep',4,40000,'2023-03-15'),
        ('Lisa','Chen','lisa@moderntech.com','Frontend Developer',1,65000,'2022-06-18')`);
    }
    console.log("15 employees seeded");
  } catch (e) {
    console.error("DB Init error", e.message);
  }
}
initDB();

app.listen(process.env.PORT, () =>
  console.log(`API running http://localhost:${process.env.PORT}`),
);
