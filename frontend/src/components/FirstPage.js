import React, { useState } from 'react';
import './styles/styles.css';

const FirstPage = ({ navigate }) => {
    const [uid, setUid] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/validate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ uid }),
        });

        const data = await response.json();
        if (data.success) {
            navigate('/second', { uid });
        } else {
            setError(data.message);
        }
    };

    return (
        <div className="container">
            <h1>Reimbursement Portal</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="uid">Enter UID:</label>
                <input
                    type="text"
                    id="uid"
                    name="uid"
                    value={uid}
                    onChange={(e) => setUid(e.target.value)}
                    required
                />
                <button type="submit">Submit</button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
};

export default FirstPage;
