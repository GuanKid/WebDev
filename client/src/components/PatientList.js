import React from 'react';

function PatientList({ patients, updatePatientStatus, actions }) {
  return (
    <ul className="patient-list">
      {patients.map(patient => (
        <li key={patient.id}>
          <strong>{patient.name}</strong> ({patient.age}) - {patient.chiefComplaint}
          {actions && updatePatientStatus && (
            <div className="actions">
              {actions.map(action => (
                <button key={action} onClick={() => updatePatientStatus(patient.id, action)}>
                  {action}
                </button>
              ))}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

export default PatientList;