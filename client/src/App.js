import React, { useState, useEffect } from 'react';
import PatientCheckIn from './components/PatientCheckIn';
import Triage from './components/Triage';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import { getAllPatients, createPatient, updatePatient, dischargePatient } from './api/patientApi';
import './App.css';

function App() {
  const [patients, setPatients] = useState([]);
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    if (user) {
      fetchPatients();
    }
  }, [user]);

  const fetchPatients = async () => {
    try {
      const patientsData = await getAllPatients();
      setPatients(patientsData);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const handleCheckIn = async (patientData) => {
    try {
      const newPatient = await createPatient(patientData);
      setPatients([...patients, newPatient]);
    } catch (error) {
      console.error('Error checking in patient:', error);
    }
  };

  const handleTriage = async (id, triageLevel) => {
    try {
      const updatedPatient = await updatePatient(id, { triageLevel });
      setPatients(patients.map(p => p._id === id ? updatedPatient : p));
    } catch (error) {
      console.error('Error triaging patient:', error);
    }
  };

  const handleDischarge = async (id) => {
    try {
      const dischargedPatient = await dischargePatient(id);
      setPatients(patients.map(p => p._id === id ? dischargedPatient : p));
    } catch (error) {
      console.error('Error discharging patient:', error);
    }
  };

  const handleLogin = (userData) => {
    setUser(userData.user);
    localStorage.setItem('token', userData.token);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  const handleRegister = () => {
    setShowRegister(false);
  };

  if (!user) {
    return (
      <div className="App">
        {showRegister ? (
          <Register onRegister={handleRegister} />
        ) : (
          <Login onLogin={handleLogin} />
        )}
        <button onClick={() => setShowRegister(!showRegister)}>
          {showRegister ? 'Back to Login' : 'Register'}
        </button>
      </div>
    );
  }

  return (
    <div className="App">
      <header>
        <h1>Hospital Management System</h1>
        <p>Welcome, {user.username} ({user.role})</p>
        <button onClick={handleLogout}>Logout</button>
      </header>
      <div className="app-container">
        <PatientCheckIn onCheckIn={handleCheckIn} />
        <Triage patients={patients} onTriage={handleTriage} />
        <Dashboard patients={patients} onDischarge={handleDischarge} />
      </div>
    </div>
  );
}

export default App;