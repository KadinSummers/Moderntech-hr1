const express = require("express");
const pool = require("../config/db");
const auth = require("../middleware/auth");
const router = express.Router();
router.use(auth);

router.get("/", async (req, res) => {
  const [rows] = await pool.query(`
    SELECT t.*, CONCAT(e.first_name,' ',e.last_name) as employee_name
    FROM time_off_requests t JOIN employees e ON t.employee_id=e.id ORDER BY t.created_at DESC
  `);
  res.json(rows);
});

router.post("/", async (req, res) => {
  const { employee_id, start_date, end_date, reason } = req.body;
  if (!employee_id || !start_date || !end_date || !reason)
    return res.status(400).json({ error: "All fields required" });
  const [result] = await pool.execute(
    "INSERT INTO time_off_requests (employee_id,start_date,end_date,reason) VALUES (?,?,?,?)",
    [employee_id, start_date, end_date, reason],
  );
  res.json({ id: result.insertId });
});

router.put("/:id/status", async (req, res) => {
  const { status } = req.body; // approved / rejected
  await pool.execute("UPDATE time_off_requests SET status=? WHERE id=?", [
    status,
    req.params.id,
  ]);
  res.json({ message: "Status updated" });
});

module.exports = router;
