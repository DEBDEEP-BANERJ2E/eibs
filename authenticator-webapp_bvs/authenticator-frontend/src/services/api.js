import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8545", // Update if needed for your network
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
