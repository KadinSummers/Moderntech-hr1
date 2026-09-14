const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");
const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !email.includes("@"))
    return res.status(400).json({ error: "Valid email required" });
  if (!password) return res.status(400).json({ error: "Password required" });

  try {
    const [rows] = await pool.execute(
      "SELECT * FROM users WHERE email =? LIMIT 1",
      [email],
    );

    // Auto-create admin if not exists (for first run)
    if (
      rows.length === 0 &&
      email === "admin@moderntech.com" &&
      password === "admin123"
    ) {
      const hash = await bcrypt.hash(password, 10);
      await pool.execute(
        "INSERT INTO users (email,password_hash,role) VALUES (?,?,?)",
        [email, hash, "admin"],
      );
      const token = jwt.sign({ id: 1, role: "admin" }, process.env.JWT_SECRET, {
        expiresIn: "8h",
      });
      return res.json({ token, user: { email, role: "admin" } });
    }
    if (rows.length === 0)
      return res.status(400).json({ error: "Invalid credentials" });

    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "8h" },
    );
    res.json({ token, user: { email: user.email, role: user.role } });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
