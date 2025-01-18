import axios from 'axios';

// Base URL for the verification API
const API_BASE_URL = 'https://your-api-endpoint.com/api'; // Replace with your actual endpoint

/**
 * Verifies a credential using the API.
 * @param {Object} credentialData - The data of the credential to be verified.
 * @returns {Promise<Object>} - The API response containing verification status.
 */
export const verifyCredential = async (credentialData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/verify`, credentialData);
    return response.data; // Return the verification result
  } catch (error) {
    console.error('Error verifying credential:', error.message);
    throw error; // Propagate the error to the caller
  }
};

/**
 * Fetches the status of a verification request by ID.
 * @param {string} requestId - The ID of the verification request.
 * @returns {Promise<Object>} - The API response containing request status.
 */
export const getVerificationStatus = async (requestId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/verify/${requestId}`);
    return response.data; // Return the status
  } catch (error) {
    console.error('Error fetching verification status:', error.message);
    throw error; // Propagate the error to the caller
  }
};

// Named export for the verificationService object
const verificationService = {
  verifyCredential,
  getVerificationStatus,
};

export { verificationService }; // Use named export
