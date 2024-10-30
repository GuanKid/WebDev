import React from 'react';
import PatientList from './PatientList';

function Triage({ patients, updatePatientStatus }) {
  const waitingPatients = patients.filter(patient => patient.status === 'Waiting');

  return (
    <div className="triage">
        <br></br>
        <br></br>
      <h2>Triage</h2>
      <PatientList 
        patients={waitingPatients}
        updatePatientStatus={updatePatientStatus}
        actions={['In Treatment', 'Discharged']}
      />
    </div>
  );
}

export default Triage;