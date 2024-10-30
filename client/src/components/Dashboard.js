import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSun, FaMoon, FaSignOutAlt, FaUserMd, FaUserPlus } from 'react-icons/fa';
import PatientList from './PatientList';
import PatientCheckIn from './PatientCheckIn';

function Dashboard({ patients, updatePatientStatus, addPatient }) {
  const [darkMode, setDarkMode] = useState(false);
  const [showAddPatient, setShowAddPatient] = useState(false);
  const inTreatmentPatients = patients.filter(patient => patient.status === 'In Treatment');
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  const handleAddPatient = (patientData) => {
    addPatient(patientData);
    setShowAddPatient(false);
  };

  return (
    <motion.div 
    className={`dashboard ${darkMode ? 'dark' : 'light'}`}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
      <header className="dashboard-header">
        <div className="user-info">
          <FaUserMd />
          <span>Dr. Smith</span>
        </div>
        
        <h1>Hospital ER Dashboard</h1>
        <div className="header-actions">
        <button onClick={toggleDarkMode}>
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
          <button className="logout-btn">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </header>

      <button className="add-patient-btn" onClick={() => setShowAddPatient(true)}>
        <FaUserPlus /> Add Patient
      </button>
      <h2>Patients in Treatment</h2>
      <PatientList 
        patients={inTreatmentPatients}
        actions={['Discharged']}
        updatePatientStatus={updatePatientStatus}
      />

      <motion.div 
        className="stats"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <p>Total Patients: {patients.length}</p>
        <p>Waiting: {patients.filter(p => p.status === 'Waiting').length}</p>
        <p>In Treatment: {inTreatmentPatients.length}</p>
        <p>Discharged: {patients.filter(p => p.status === 'Discharged').length}</p>
      </motion.div>

      {showAddPatient && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setShowAddPatient(false)}>×</button>
            <PatientCheckIn addPatient={handleAddPatient} />
          </div>
        </div>
      )}
      
    </motion.div>
  );
}

export default Dashboard;