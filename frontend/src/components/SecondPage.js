import React, { useState } from 'react';
import './styles/styles.css';

const SecondPage = ({ uid }) => {
    const [formData, setFormData] = useState({
        competitionName: '',
        studentName: '',
        leaderName: '',
        studentId: '',
        ticketFile: null,
    });
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, ticketFile: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('uid', uid);
        form.append('competitionName', formData.competitionName);
        form.append('studentName', formData.studentName);
        form.append('leaderName', formData.leaderName);
        form.append('studentId', formData.studentId);
        form.append('ticketFile', formData.ticketFile);

        const response = await fetch('http://localhost:5000/api/submit', {
            method: 'POST',
            body: form,
        });

        const data = await response.json();
        if (data.success) {
            setSuccessMessage(`Submission successful! Token ID: ${data.tokenId}`);
        } else {
            alert(data.message);
        }
    };

    return (
        <div className="container">
            <h1>Reimbursement Submission</h1>
            <form onSubmit={handleSubmit}>
                <label>Competition Name:</label>
                <input type="text" name="competitionName" onChange={handleChange} required />
                <label>Student Name:</label>
                <input type="text" name="studentName" onChange={handleChange} required />
                <label>Leader Name:</label>
                <input type="text" name="leaderName" onChange={handleChange} required />
                <label>Student ID:</label>
                <input type="text" name="studentId" onChange={handleChange} required />
                <label>Upload Ticket (PDF):</label>
                <input type="file" accept="application/pdf" onChange={handleFileChange} required />
                <button type="submit">Submit</button>
                {successMessage && <p>{successMessage}</p>}
            </form>
        </div>
    );
};

export default SecondPage;
