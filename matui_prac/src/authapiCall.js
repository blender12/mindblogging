import axios from 'axios';

const API=axios.create({baseURL:"https://mindblogging.herokuapp.com/mindblogging",headers:{'Content-Type':'multipart/form-data'}})
const API_ref=axios.create({baseURL:"https://mindblogging.herokuapp.com/mindblogging"})

API.interceptors.request.use(req=>{
    if(localStorage.getItem("profile")){
        req.headers.Authorization=`Bearer ${JSON.parse(localStorage.getItem("profile")).token}`
    }
    return req;
})


API_ref.interceptors.request.use(req=>{
    if(localStorage.getItem("profile")){
        req.headers.Authorization=`Bearer ${JSON.parse(localStorage.getItem("profile")).refToken}`
    }
    return req;
 })

API.interceptors.response.use(response=>response,async error=>{
    const originalRequest = error.config;
 if(error.response.status===401 && error.response.data==='jwt token expired'){
    let {data}=await API_ref.post("/refreshtoken",JSON.parse(localStorage.getItem("profile")).user)
    localStorage.setItem("profile",JSON.stringify(data));
    return API(originalRequest);
 }
 if(error.response.status===500){
     window.location.href="/error500"
 }
 if(error.response.status===403 && error.response.data==='forbidden route'){
     window.location.href="/error403"
 }
 if(error.response.status===401 && error.response.data==='jwt refreshtoken expired'){
     window.location.href="/";
 }
 return Promise.reject(error);

})



export const addPost=(formdata)=>API.post('/addpost',formdata);
export const editPost=(formdata,id)=>API.put(`/editpost/data?id=${id}`,formdata);
export const commentPost=(formdata,id)=>API.post(`/addcomment/data?id=${id}`,formdata);
export const getcomment=(id)=>API.get(`/comment/data?id=${id}`);
export const deletecomment=(id)=>API.delete(`/deletecomment/data?id=${id}`);
export const likePost=(userid,postid)=>API.put(`/like/data?userid=${userid}&postid=${postid}`);
export const test=()=>API.get('/test');
export const profile=(userid)=>API.get(`/profile/post?id=${userid}`);
export const deletePost=(id,img)=>API.delete(`/deletepost/post?id=${id}&imgid=${img}`);
