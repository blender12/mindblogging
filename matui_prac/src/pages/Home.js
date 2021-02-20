import React,{useEffect}from 'react';
import {useDispatch} from 'react-redux';
import Navbar from '../components/Navbar.jsx';
import {mobileViews} from '../actions/user_action';
import GridPost from '../components/Home/Grid_posts_controller.js';




function Posts(){
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
        <GridPost/>
        </>
    )
}

export default Posts;