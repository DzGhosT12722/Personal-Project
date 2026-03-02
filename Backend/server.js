const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors({
  origin: "http://localhost:5500",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Fake database (temporary)
let users = [];

/* ================= SIGNUP ================= */
app.post("/signup", (req, res) => {
  const { email, password } = req.body;

  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  users.push({ email, password });

  res.json({ message: "Account created successfully" });
});

/* ================= LOGIN ================= */
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // store last login
  res.cookie("lastLoginUser", email, {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: false
  });

  res.json({ message: "Login successful" });
});

/* ================= LAST LOGIN ================= */
app.get("/last-login", (req, res) => {
  const lastUser = req.cookies.lastLoginUser || null;
  res.json({ lastUser });
});

app.listen(5000, () => {
  console.log("✅ Server running on port 5000");
});