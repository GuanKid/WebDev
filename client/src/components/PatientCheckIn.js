import React, { useState } from 'react';

function PatientCheckIn({ onCheckIn }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [condition, setCondition] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCheckIn({ name, age: parseInt(age), condition, triageLevel: 0 });
    setName('');
    setAge('');
    setCondition('');
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
          placeholder="Condition"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          required
        ></textarea>
        <button type="submit">Check In</button>
      </form>
    </div>
  );
}

export default PatientCheckIn;