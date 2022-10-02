import axios from 'axios';

//giving a base url for proxy so that every time a request is made it calls port 4242
const API = axios.create({baseURL: process.env.API_URL });

//login function, formData is received from the action, api makes a post request to the login route, and the data is the req.body data 
export const logIn = (formData) => API.post('/auth/login', formData)

//sign up function, formData is received from the action, api makes a post request to the register route, and the data is the req.body data 
export const signUp = (formData) => API.post('/auth/register', formData)