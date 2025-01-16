const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

exports.saveSubmission = async (req, res) => {
    const { uid, competitionName, studentName, leaderName, studentId } = req.body;
    const ticketFile = req.file;
    const tokenId = uuidv4();

    const filePath = path.join(__dirname, '../data/submissions.xlsx');
    const newEntry = [{ UID: uid, competitionName, studentName, leaderName, studentId, tokenId }];

    let workbook;
    if (fs.existsSync(filePath)) {
        workbook = xlsx.readFile(filePath);
    } else {
        workbook = xlsx.utils.book_new();
    }

    const worksheet = workbook.Sheets['Submissions'] || xlsx.utils.json_to_sheet([]);
    xlsx.utils.sheet_add_json(worksheet, newEntry, { origin: -1 });
    workbook.Sheets['Submissions'] = worksheet;

    xlsx.writeFile(workbook, filePath);

    res.status(200).json({ success: true, tokenId });
};
