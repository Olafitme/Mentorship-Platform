import axios from 'axios';

export const updateSessionStatus = async (sessionId, status) => {
  try {
    const response = await axios.put(`http://localhost:5000/api/sessions/${sessionId}/status`, {
      status,
    });
    return response.data;
  } catch (error) {
    console.error('❌ Error updating session status:', error);
    throw error;
  }
};