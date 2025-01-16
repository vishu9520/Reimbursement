exports.validateUID = (req, res) => {
    const { uid } = req.body;
    const regex21 = /^21bcs\d{4}$/;
    const regexAfter21 = /^(2[2-4]bcs\d{5})$/;

    if (regex21.test(uid) || regexAfter21.test(uid)) {
        res.status(200).json({ success: true });
    } else {
        res.status(400).json({ success: false, message: 'Invalid UID' });
    }
};
