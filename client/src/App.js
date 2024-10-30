import React, { useState } from 'react';
import PatientCheckIn from './components/PatientCheckIn';
import Triage from './components/Triage';
import Dashboard from './components/Dashboard';
import { FaBars } from 'react-icons/fa';
import './App.css';

function App() {
  const [patients, setPatients] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const addPatient = (patient) => {
    setPatients([...patients, { ...patient, id: Date.now(), status: 'Waiting' }]);
  };

  const updatePatientStatus = (id, status) => {
    setPatients(patients.map(patient => 
      patient.id === id ? { ...patient, status } : patient
    ));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="App">
    
      <div className="main-content">
        <Dashboard 
          patients={patients} 
          updatePatientStatus={updatePatientStatus}
          addPatient={addPatient}
        />
          <button className="toggle-sidebar" onClick={toggleSidebar}>
        <FaBars />
      </button>
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <Triage patients={patients} updatePatientStatus={updatePatientStatus} />
      </aside>
      </div>
    </div>
  );
}

export default App;




