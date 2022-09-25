import axios from 'axios';

//giving a base url for proxy so that every time a request is made it calls port 4242
const API = axios.create({baseURL: "http://localhost:4242"})

//upload function, image data is received from the action, api makes a post request to the upload route
export const uploadImage = (data) => API.post('/upload/', data)

export const uploadPost = (data) => API.post('/post', data)