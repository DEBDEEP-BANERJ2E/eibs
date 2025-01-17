import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export const fetchSomething = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/some-endpoint`);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};
