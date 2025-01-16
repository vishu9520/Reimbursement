const express = require("express");
const cors = require("cors");
const reimbursementRoutes = require("./routes/reimbursementRoutes");
const excelRoutes = require("./routes/excelRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/reimbursement", reimbursementRoutes);
app.use("/api/excel", excelRoutes);

app.get("/", (req, res) => {
  res.send("Reimbursement Backend is Running!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
