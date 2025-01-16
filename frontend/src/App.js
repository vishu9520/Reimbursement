import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [uid, setUid] = useState("");
  const [isValidUid, setIsValidUid] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    competitionName: "",
    studentName: "",
    leaderName: "",
    studentId: "",
    ticket: null,
  });
  const [tokenId, setTokenId] = useState("");

  const handleUidSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/reimbursement/validate", { uid });
      setIsValidUid(true);
      setStep(2);
    } catch (error) {
      alert("Invalid UID. Please try again.");
    }
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataObj.append(key, value);
    });
    formDataObj.append("uid", uid);

    try {
      const response = await axios.post("http://localhost:5000/api/excel/submit", formDataObj, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setTokenId(response.data.tokenId);
      setStep(3);
    } catch (error) {
      alert("Error submitting the form. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", fontFamily: "Arial, sans-serif" }}>
      {step === 1 && (
        <form onSubmit={handleUidSubmit}>
          <h1>Validate UID</h1>
          <input
            type="text"
            name="uid"
            placeholder="Enter UID"
            value={uid}
            onChange={(e) => setUid(e.target.value)}
            required
            style={{ padding: "10px", width: "100%", marginBottom: "10px", border: "1px solid #ddd", borderRadius: "5px" }}
          />
          <button type="submit" style={{ padding: "10px 20px", backgroundColor: "#5cb85c", color: "white", border: "none", borderRadius: "5px" }}>
            Submit
          </button>
        </form>
      )}
      {step === 2 && (
        <form onSubmit={handleFormSubmit} encType="multipart/form-data">
          <h1>Competition Details</h1>
          <input
            type="text"
            name="competitionName"
            placeholder="Competition Name"
            value={formData.competitionName}
            onChange={handleFormChange}
            required
            style={{ padding: "10px", width: "100%", marginBottom: "10px", border: "1px solid #ddd", borderRadius: "5px" }}
          />
          <input
            type="text"
            name="studentName"
            placeholder="Student Name"
            value={formData.studentName}
            onChange={handleFormChange}
            required
            style={{ padding: "10px", width: "100%", marginBottom: "10px", border: "1px solid #ddd", borderRadius: "5px" }}
          />
          <input
            type="text"
            name="leaderName"
            placeholder="Leader Name"
            value={formData.leaderName}
            onChange={handleFormChange}
            required
            style={{ padding: "10px", width: "100%", marginBottom: "10px", border: "1px solid #ddd", borderRadius: "5px" }}
          />
          <input
            type="text"
            name="studentId"
            placeholder="Student ID"
            value={formData.studentId}
            onChange={handleFormChange}
            required
            style={{ padding: "10px", width: "100%", marginBottom: "10px", border: "1px solid #ddd", borderRadius: "5px" }}
          />
          <input
            type="file"
            name="ticket"
            accept="application/pdf"
            onChange={handleFormChange}
            required
            style={{ marginBottom: "10px" }}
          />
          <button type="submit" style={{ padding: "10px 20px", backgroundColor: "#5cb85c", color: "white", border: "none", borderRadius: "5px" }}>
            Submit
          </button>
        </form>
      )}
      {step === 3 && (
        <div>
          <h1>Submission Successful</h1>
          <p>Your Token ID: <strong>{tokenId}</strong></p>
          <p>An email has been sent to the leader with the Token ID.</p>
        </div>
      )}
    </div>
  );
};

export default App;
