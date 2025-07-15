import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: 'https://kabutario.vercel.app/', 
    headers: {
        "authorization": `Bearer ${localStorage.getItem('token')}`,
    }
});

export default axiosInstance;
