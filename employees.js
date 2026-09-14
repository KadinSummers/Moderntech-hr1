const express = require("express");
const pool = require("../config/db");
const auth = require("../middleware/auth");
const router = express.Router();
router.use(auth);

router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT e.*, d.name as dept_name, d.location
      FROM employees e LEFT JOIN departments d ON e.department_id = d.id
      ORDER BY e.id DESC
    `);
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/", async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    job_title,
    department_id,
    salary,
    hire_date,
  } = req.body;
  if (
    !first_name ||
    !last_name ||
    !email?.includes("@") ||
    !job_title ||
    !salary
  ) {
    return res
      .status(400)
      .json({ error: "All fields required with valid email" });
  }
  if (salary < 10000)
    return res.status(400).json({ error: "Salary must be > R10000" });
  try {
    const [result] = await pool.execute(
      "INSERT INTO employees (first_name,last_name,email,job_title,department_id,salary,hire_date) VALUES (?,?,?,?,?,?,?)",
      [
        first_name,
        last_name,
        email,
        job_title,
        department_id || 1,
        salary,
        hire_date || new Date().toISOString().split("T")[0],
      ],
    );
    res.json({ id: result.insertId, message: "Employee created" });
  } catch (e) {
    if (e.code === "ER_DUP_ENTRY")
      return res.status(400).json({ error: "Email already exists" });
    res.status(500).json({ error: e.message });
  }
});

router.put("/:id", async (req, res) => {
  const { first_name, last_name, email, job_title, department_id, salary } =
    req.body;
  try {
    await pool.execute(
      "UPDATE employees SET first_name=?,last_name=?,email=?,job_title=?,department_id=?,salary=? WHERE id=?",
      [
        first_name,
        last_name,
        email,
        job_title,
        department_id,
        salary,
        req.params.id,
      ],
    );
    res.json({ message: "Updated" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await pool.execute("DELETE FROM employees WHERE id=?", [req.params.id]);
    res.json({ message: "Deleted" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
