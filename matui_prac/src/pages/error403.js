import React from 'react';
import img from './error403.jpg';



function error403(){
  return(
    <img src={img} style={{width:"100%",height:"100vh"}} alt="error_img"/>
  )
}

export default  error403;