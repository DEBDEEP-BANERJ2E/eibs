import axios from "axios";

export const fetchData = (endpoint) => {
    return axios.get(endpoint);
};
