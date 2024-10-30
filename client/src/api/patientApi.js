import axios from 'axios';

const API_URL = 'http://localhost:5000/api/patients';

const authAxios = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

authAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getAllPatients = async () => {
  const response = await authAxios.get('');
  return response.data;
};

export const createPatient = async (patientData) => {
  const response = await authAxios.post('', patientData);
  return response.data;
};

export const updatePatient = async (id, patientData) => {
  const response = await authAxios.put(`/${id}`, patientData);
  return response.data;
};

export const dischargePatient = async (id) => {
  const response = await authAxios.put(`/${id}/discharge`);
  return response.data;
};