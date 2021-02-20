import React from 'react';
import {useSelector} from 'react-redux';
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import {makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ProfileCard from './profile_post.jsx';


const override = css`
  display: block;
  margin: 18% auto;
`;

const mobOverride=css`
display: block;
margin: 50% auto;`;


const useStyles=makeStyles((theme)=>({
    gridContainer:{
        marginTop:"72px",
        width:"100%",
        padding:"0 16px",
    },
}))



function ProfileGrid(){
    const profileinfo=useSelector(state=>state.post);
    const mobileView=useSelector(state=>state.mobileView);
    const classes=useStyles();
    return(
        <>
        {profileinfo?<Grid container className={classes.gridContainer}>
        {Array.isArray(profileinfo.mypost)?profileinfo.mypost.map((cValue,index)=>{
        return <ProfileCard key={index} id={"/post/"+cValue._id} username={cValue.user_info[0].username} avatar={cValue.user_info[0].avatar} content={cValue.content} title={cValue.title} img={cValue.img} date={cValue.createdAt}/>
        }): <ClipLoader color="#3d51c4" loading={true} css={override} size={150} />}
        </Grid>: <ClipLoader  color="#3d51c4" loading={true} css={mobileView?mobOverride:override} size={150} />}
        </>
    )
}

export default ProfileGrid;