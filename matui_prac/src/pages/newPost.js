import React,{useEffect}from 'react';
import {useDispatch,useSelector} from 'react-redux';
import NewPost from '../components/newPost.jsx';
import Navbar from '../components/Navbar.jsx';
import {Redirect} from 'react-router-dom';
import {mobileViews} from '../actions/user_action';

function Newpost(){
    const userinfo=useSelector(state=>state.user);
    const dispatch=useDispatch();
    useEffect(()=>{
        const setResponsiveness = () => {
            return window.innerWidth <900?dispatch(mobileViews(true)):dispatch(mobileViews(false))
        }
        setResponsiveness();
        window.addEventListener("resize", () => setResponsiveness());
    },[])
   
 return(
     <>
      <Navbar/>
      <NewPost/>
      </>
     
 )
}

export default Newpost;