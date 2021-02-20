import React, {useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {setPost} from '../actions/post_action';
import {makeStyles,Grid,Card,Typography,Button,TextField,CardActions, CardContent,Fab} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';



const useStyle=makeStyles((theme)=>({
    gridContainer:{
   margin:"0 auto",
   display:"flex",
   justifyContent:"center",
   marginTop:"72px",
    width:"90%",
    padding:"0 1rem"
    },
    card:{
        width:"100%",
        height:"auto",
    },
    Textfield:{
        width:"55%",
        marginRight:"16px"
    },
    CardActions:{
        justifyContent:"flex-end",
        marginRight:"12px",
    },
    centerDiv:{
        width:"90%",
        margin:"20px auto"
    },
   

    [theme.breakpoints.down('md')]:{
        gridContainer:{
            width:"100%", 
            padding:"0" 
        },
        Textfield:{
            width:"100%",
            marginBottom:"16px",
            marginRight:"12px"
        },
    },

    centerDiv:{
        width:"100%",
        margin:"20px auto"
    },

}))

function Write(){
const dispatch=useDispatch();    
const userinfo=useSelector((state)=>state.user)
const mobileView=useSelector(state=>state.mobileView);
const classes=useStyle();
const [title,setTitle]=useState(undefined);
const [article,setArticle]=useState(undefined);
const [img,setImage]=useState(undefined);
     const vanish=()=>{
        setTitle("");
        setArticle(undefined);
        setImage(undefined);
     }

     const upload=async(e)=>{
            e.preventDefault();
            let formdata=new FormData();
            formdata.append("title",title);
            formdata.append('content',article);
            formdata.append("blogImg",img,img.name);
            formdata.append("user_id",userinfo?.user?._id);
            try{
               dispatch(setPost(formdata));
                
            }catch(err){
                console.log(err);
            }

     }

 

    return(
      <Grid className={classes.gridContainer}>
       <Grid item xs={12} >
        <Card className={classes.card}>
        <CardContent>
        <Typography align="center"  style={mobileView?{fontSize:"32px",color:"black"}:{fontSize:"55px"}}>New Blog</Typography>
        <form onSubmit={upload}>
        <div className={classes.centerDiv}>
            <TextField  className={classes.Textfield} value={title} variant="outlined" fullWidth placeholder="Title"onChange={(e)=>{
               setTitle(e.target.value);
            }}/>
        <label htmlFor="upload-photo">
         <input type="file" style={{display:"none"}} name='upload-photo' id="upload-photo" onChange={(e)=>{
             setImage(e.target.files[0]);
         }}/>
         <Fab color="primary" size={mobileView?"small":"large"}  component="span" aria-label="add" variant="extended"><AddIcon /><Typography style={{fontSize:"9px"}}>Upload Photo</Typography></Fab></label>
         </div>
        
        <div className={classes.centerDiv}>
        <CKEditor
          
                editor={ ClassicEditor }
                config={{
                    removePlugins: ['Image', 'ImageCaption', 'ImageStyle', 'ImageToolbar', 'ImageUpload', 'MediaEmbed']
                  }}
                data={article!==undefined?article:"<p>Write your new blog here</p>"}
                onReady={ editor => {
                   
                    editor.editing.view.change(writer => {
                        writer.setStyle(
                          "height",
                          mobileView?"280px":"550px",
                          editor.editing.view.document.getRoot()
                        );
                      });
                } }
                onChange={ ( event, editor ) => {
                    const data = editor.getData();
                    console.log( { event, editor, data } );
                    setArticle(data);
                } }
                onBlur={ ( event, editor ) => {
                    console.log( 'Blur.', editor );
                } }
                onFocus={ ( event, editor ) => {
                    console.log( 'Focus.', editor );
                } }
            />
        </div>
        <CardActions className={classes.CardActions}>
               <Button  color="primary" onClick={vanish}>Cancel</Button>
               <Button variant="contained" color="primary" type="submit">Add</Button>
           </CardActions>
        </form>
        </CardContent>
        </Card>
       </Grid>
      </Grid>
    )
}

export default Write;