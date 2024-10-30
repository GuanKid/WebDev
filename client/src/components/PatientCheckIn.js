import React, { useState } from 'react';

function PatientCheckIn({ addPatient }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [chiefComplaint, setChiefComplaint] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addPatient({ name, age, chiefComplaint });
    setName('');
    setAge('');
    setChiefComplaint('');
  };

  return (
    <div className="patient-check-in">
      <h2>Patient Check-In</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <textarea
          placeholder="Chief Complaint"
          value={chiefComplaint}
          onChange={(e) => setChiefComplaint(e.target.value)}
          required
        ></textarea>
        <button type="submit">Check In</button>
      </form>
    </div>
  );
}

export default PatientCheckIn;