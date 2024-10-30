import React from 'react';

function Triage({ patients, onTriage }) {
  const untriaged = patients.filter(patient => patient.triageLevel === 0 && !patient.discharged);

  return (
    <div className="triage">
      <h2>Triage</h2>
      <ul className="patient-list">
        {untriaged.map(patient => (
          <li key={patient._id}>
            <strong>{patient.name}</strong> ({patient.age}) - {patient.condition}
            <div className="actions">
              <button onClick={() => onTriage(patient._id, 1)}>Low</button>
              <button onClick={() => onTriage(patient._id, 2)}>Medium</button>
              <button onClick={() => onTriage(patient._id, 3)}>High</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Triage;