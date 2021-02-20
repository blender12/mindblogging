import React,{useEffect} from 'react';
import {useLocation} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import {makeStyles } from '@material-ui/core/styles';
import MainPost from './mainCardPost';
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core"
import SubPost  from './subpost';
import {getPosts} from '../../actions/post_action';


const override = css`
  display: block;
  margin: 18% auto;
`;

const mobOverride=css`
display: block;
margin: 50% auto;`;

const useStyles=makeStyles((theme)=>({
    maingrid:{
        marginTop:"72px",
    },
}))

function Posts(){
  const  locations=useLocation();
    const postinfo=useSelector((state)=>state.post);
    const mobileView=useSelector(state=>state.mobileView);
    const dispatch=useDispatch();



    useEffect(()=>{
        
          dispatch(getPosts());
    },[locations])

    const classes=useStyles();
    return(
        <>
        <div className={classes.maingrid}>
        <Grid container>
         {Array.isArray(postinfo)?postinfo.map((cValue,index)=>{
             let n;
             mobileView?n=10:n=2;
             return index<n?<MainPost key={index} image={cValue.img} title={cValue.title} username={cValue.user_info[0].username} date={cValue.createdAt} avatar={cValue.user_info[0].avatar} id={"/post/"+cValue._id} likes={cValue.likes} />:null
         }):<ClipLoader color="#3d51c4" loading={true} css={mobileView?mobOverride:override} size={150}/>}
        </Grid>
        <Grid container className={classes.subgrid}>
        {mobileView?null:Array.isArray(postinfo)?postinfo.map((cValue,index)=>{
            return index>=2?<SubPost key={index} username={cValue.user_info[0].username} date={cValue.createdAt} content={cValue.content} title={cValue.title} id={"/post/"+cValue._id} likes={cValue.likes} />:null
        }):<ClipLoader color="#3d51c4" loading={true} css={override} size={150}/>}
        </Grid>
        </div>
        </>
    )
}


export default Posts;