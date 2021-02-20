import axios from 'axios';
const API=axios.create({baseURL:"https://mindblogging.herokuapp.com/mindblogging"})
export const signIn=(data)=>API.post('/signin',data);

export const logOut=()=>API.get('/logout');

export const allPosts=()=>API.get('/posts');

export const getPost=(data)=>API.get(`/post/data?id=${data}`)
