import axios from 'axios';

//giving a base url for proxy so that every time a request is made it calls port 4242
const API = axios.create({baseURL: "http://localhost:4242"});

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        console.log(`Bearer ${JSON.parse(localStorage.getItem('profile')).token}`)

      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });

export const getUser = (userId) => API.get(`/user/${userId}`);

export const updateUser = (id, formData) => API.put(`/user/${id}`, formData);

export const getAllUsers = () => API.get(`/user`);

export const followUser = (id, data) => API.put(`/user/${id}/follow`, data);

export const unfollowUser = (id, data)=> API.put(`/user/${id}/unfollow`, data);