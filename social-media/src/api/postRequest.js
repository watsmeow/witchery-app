import axios from 'axios';

//giving a base url for proxy so that every time a request is made it calls port 4242
const API = axios.create({baseURL: "http://localhost:4242"})

//request to get posts of users you follow
export const getTimelinePosts = (id) => API.get(`/post/${id}/timeline`)

//
export const likePost = (id, userId) => API.put(`post/${id}/like`, {userId: userId})