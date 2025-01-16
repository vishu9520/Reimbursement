const express = require("express");
const multer = require("multer");
const XLSX = require("xlsx");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const emailService = require("../services/emailService");

// Configure file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Endpoint to save form data to Excel
router.post("/submit", upload.single("ticket"), async (req, res) => {
  const { competitionName, studentName, leaderName, studentId, uid } = req.body;

  const filePath = path.join(__dirname, "../data/submissions.xlsx");

  let workbook;
  let worksheet;

  // Check if file exists
  if (fs.existsSync(filePath)) {
    workbook = XLSX.readFile(filePath);
    worksheet = workbook.Sheets[workbook.SheetNames[0]];
  } else {
    workbook = XLSX.utils.book_new();
    worksheet = XLSX.utils.aoa_to_sheet([["Competition Name", "Student Name", "Leader Name", "Student ID", "UID", "Ticket"]]);
  }

  const newRow = [competitionName, studentName, leaderName, studentId, uid, req.file ? req.file.path : ""];

  XLSX.utils.sheet_add_aoa(worksheet, [newRow], { origin: -1 });
  XLSX.utils.book_append_sheet(workbook, worksheet, "Submissions");
  XLSX.writeFile(workbook, filePath);

  // Generate token
  const tokenId = `${uid}-${Date.now()}`;

  // Send email
  const leaderEmail = `${uid}@cuchd.in`;
  await emailService.sendEmail(leaderEmail, "Reimbursement Submission Token", `Your token ID is: ${tokenId}`);

  res.status(200).json({ message: "Submission successful", tokenId });
});

module.exports = router;
