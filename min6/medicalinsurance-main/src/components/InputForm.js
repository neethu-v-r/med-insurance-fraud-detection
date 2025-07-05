import React, { useState } from "react";
import axios from "axios";  
import "../styles/InputForm.css";  

const API_BASE_URL = "http://localhost:8000/fraud-detection";  

const InputForm = () => {
    const [formData, setFormData] = useState({
        age: "",
        gender: "",  
        bmi: "",
        num_claims: "",
        num_hospital_visits: "",
        has_chronic_disease: "",
        claim_amount: "",
        claim_reason: "",
        doctor_visits: "",
        days_hospitalized: "",
        billing_code_mismatch: "",
        claim_per_visit: "",
        insurance_type: "",
        policy_lifetime: "",
        previous_fraud_claims: ""
    });

    const [result, setResult] = useState(null);
    const [probability, setProbability] = useState(null);

    // ✅ Handle state updates directly from the form inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(`name: ${name}, value: ${value}`);

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // ✅ Send the form data to FastAPI for fraud detection
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(API_BASE_URL, formData, {
                headers: { "Content-Type": "application/json" }
            });

            setResult(response.data.fraud_prediction);
            setProbability(response.data.fraud_probability);
        } catch (error) {
            console.error("Error submitting fraud detection request:", error);
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="input-form">
                <div className="form-grid">
                    {/* Age */}
                    <div className="input-group">
                        <label>Age</label>
                        <input type="number" name="age" value={formData.age} onChange={handleChange} required />
                    </div>

                    {/* Gender */}
                    <div className="input-group">
                        <label>Gender</label>
                        <select name="gender" value={formData.gender} onChange={handleChange} required>
                            <option value="">Select Gender</option>
                            <option value="1">Male</option>
                            <option value="0">Female</option>
                        </select>
                    </div>

                    {/* BMI */}
                    <div className="input-group">
                        <label>BMI</label>
                        <input type="number" step="0.01" name="bmi" value={formData.bmi} onChange={handleChange} required />
                    </div>

                    {/* No. of Claims */}
                    <div className="input-group">
                        <label>No. of Claims</label>
                        <input type="number" name="num_claims" value={formData.num_claims} onChange={handleChange} required />
                    </div>

                    {/* No. of Hospital Visits */}
                    <div className="input-group">
                        <label>No. of Hospital Visits</label>
                        <input type="number" name="num_hospital_visits" value={formData.num_hospital_visits} onChange={handleChange} required />
                    </div>

                    {/* Chronic Disease */}
                    <div className="input-group">
                        <label>Chronic Disease</label>
                        <select name="has_chronic_disease" value={formData.has_chronic_disease} onChange={handleChange} required>
                            <option value="">Select</option>
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                        </select>
                    </div>

                    {/* Claim Amount */}
                    <div className="input-group">
                        <label>Claim Amount</label>
                        <input type="number" name="claim_amount" value={formData.claim_amount} onChange={handleChange} required />
                    </div>

                    {/* Claim Reason */}
                    <div className="input-group">
                        <label>Claim Reason</label>
                        <select name="claim_reason" value={formData.claim_reason} onChange={handleChange} required>
                            <option value="">Select Claim Reason</option>
                            <option value="1">Surgery</option>
                            <option value="2">Maternity</option>
                            <option value="3">Emergency</option>
                            <option value="4">Routine Checkup</option>
                        </select>
                    </div>

                    {/* No. of Doctor Visits */}
                    <div className="input-group">
                        <label>No. of Doctor Visits</label>
                        <input type="number" name="doctor_visits" value={formData.doctor_visits} onChange={handleChange} required />
                    </div>

                    {/* Days Hospitalized */}
                    <div className="input-group">
                        <label>Days Hospitalized</label>
                        <input type="number" name="days_hospitalized" value={formData.days_hospitalized} onChange={handleChange} required />
                    </div>

                    {/* Billing Code Mismatch */}
                    <div className="input-group">
                        <label>Billing Code Mismatch</label>
                        <select name="billing_code_mismatch" value={formData.billing_code_mismatch} onChange={handleChange} required>
                            <option value="">Select</option>
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                        </select>
                    </div>

                    {/* Claim Per Visit */}
                    <div className="input-group">
                        <label>Claim Per Visit</label>
                        <input type="number" step="0.01" name="claim_per_visit" value={formData.claim_per_visit} onChange={handleChange} required />
                    </div>

                    {/* Insurance Type */}
                    <div className="input-group">
                        <label>Insurance Type</label>
                        <select name="insurance_type" value={formData.insurance_type} onChange={handleChange} required>
                            <option value="">Select Insurance Type</option>
                            <option value="1">Public</option>
                            <option value="0">Private</option>
                        </select>
                    </div>

                    {/* Policy Lifetime */}
                    <div className="input-group">
                        <label>Policy Lifetime (Years)</label>
                        <input type="number" name="policy_lifetime" value={formData.policy_lifetime} onChange={handleChange} required />
                    </div>

                    {/* Previous Fraud Claims */}
                    <div className="input-group">
                        <label>Previous Fraud Claims</label>
                        <input type="number" name="previous_fraud_claims" value={formData.previous_fraud_claims} onChange={handleChange} required />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="submit-container">
                    <button type="submit">SUBMIT</button>
                </div>

                {/* Result Display */}
                {result && (
                    <div className="result-container">
                        <h2>Result: {result}</h2>
                        <p>Probability: {probability}%</p>
                    </div>
                )}
            </form>
        </div>
    );
};

export default InputForm;
