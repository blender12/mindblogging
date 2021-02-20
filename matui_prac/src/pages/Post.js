import React,{useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {useLocation} from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import Navbar from '../components/Navbar.jsx';
import PostBody from '../components/Posts/Main.js';
import { css } from "@emotion/core";
import '../post.css';
import {getOnepost,getComment} from "../actions/post_action";
import {mobileViews} from '../actions/user_action';

const override = css`
  display: block;
  margin: 18% auto;
`;

const mobOverride=css`
display: block;
margin: 50% auto;`;



function Posts(props){
    const location=useLocation();
    let id=props.location.pathname.slice(6,);
   const dispatch=useDispatch();
   const postinfo=useSelector((state)=>state.post);
   const mobileView=useSelector(state=>state.mobileView);
   useEffect(()=>{
    const setResponsiveness = () => {
        return window.innerWidth <900?dispatch(mobileViews(true)):dispatch(mobileViews(false))
    }
    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());
    dispatch(getOnepost(id));
    dispatch(getComment(id));
   },[location])
    return(
        <>
         <Navbar/>
         {postinfo!==null?<PostBody info={postinfo}/>: <ClipLoader color="#3d51c4" loading={true} css={mobileView?mobOverride:override} size={150} />}
        </>
    )
}

export default Posts;