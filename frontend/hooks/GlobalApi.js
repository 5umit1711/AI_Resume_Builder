import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://localhost:8000/",
    headers: {
        "Content-Type" : "application/json",
    }
})

export default axiosClient;

