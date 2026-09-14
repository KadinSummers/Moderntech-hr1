const express = require("express");
const pool = require("../config/db");
const auth = require("../middleware/auth");
const router = express.Router();
router.use(auth);

router.get("/", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM departments");
  res.json(rows);
});

router.post("/", async (req, res) => {
  const { name, location, budget } = req.body;
  if (!name || !location)
    return res.status(400).json({ error: "Name and location required" });
  const [result] = await pool.execute(
    "INSERT INTO departments (name,location,budget) VALUES (?,?,?)",
    [name, location, budget || 500000],
  );
  res.json({ id: result.insertId });
});

module.exports = router;
