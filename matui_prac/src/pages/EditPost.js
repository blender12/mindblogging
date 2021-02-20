import React,{useEffect} from 'react';
import {useLocation,Redirect} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import EditPost from '../components/Editpost.jsx';
import Navbar from '../components/Navbar.jsx';
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";
import {getOnepost} from "../actions/post_action";
import {mobileViews} from '../actions/user_action';




const override = css`
  display: block;
  margin: 18% auto;
`;

const mobOverride=css`
display: block;
margin: 50% auto;`;


function Edit(props){
    const location=useLocation();
    const dispatch=useDispatch();
    let id=props.location.pathname.slice(10,);
    const postinfo=useSelector((state)=>state.post);
    const mobileView=useSelector(state=>state.mobileView);
    useEffect(()=>{
        const setResponsiveness = () => {
            return window.innerWidth <900?dispatch(mobileViews(true)):dispatch(mobileViews(false))
        }
        setResponsiveness();
        window.addEventListener("resize", () => setResponsiveness());
     dispatch(getOnepost(id));
    
    },[location])
 return(
     <>
      <Navbar/>
      {postinfo!==null?<EditPost info={postinfo}/>: <ClipLoader color="#3d51c4" loading={true} css={mobileView?mobOverride:override} size={150} />}
      </>
 )
}

export default Edit;