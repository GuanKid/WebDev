import React from 'react';

function Dashboard({ patients, onDischarge }) {
  const triaged = patients.filter(patient => patient.triageLevel > 0 && !patient.discharged);

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <ul className="patient-list">
        {triaged.map(patient => (
          <li key={patient._id}>
            <strong>{patient.name}</strong> ({patient.age}) - {patient.condition}
            <br />
            Triage Level: {patient.triageLevel}
            <div className="actions">
              <button onClick={() => onDischarge(patient._id)}>Discharge</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;