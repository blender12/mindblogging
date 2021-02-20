import React,{useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';
import{getProfile} from '../actions/post_action';
import {mobileViews} from '../actions/user_action';
import Navbar from '../components/Navbar';
import ProfilePost from '../components/Grid_profile/Grid_profile_controller'



function Profile(){
 const dispatch=useDispatch();
 const userinfo=useSelector(state=>state.user);
 useEffect(()=>{
if(userinfo){
  const setResponsiveness = () => {
    return window.innerWidth <900?dispatch(mobileViews(true)):dispatch(mobileViews(false))
}
setResponsiveness();
window.addEventListener("resize", () => setResponsiveness());
  dispatch(getProfile(userinfo.user._id))
}
  
    

 },[userinfo]);
console.log(userinfo);


  return(
      <>
      <Navbar/>
      <ProfilePost/>
      </>
    
  )
}

export default Profile;