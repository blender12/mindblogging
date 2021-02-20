import {MOBILE_VIEW,USER_DATA} from '../types/userTypes.js';
import * as api from '../allapiCall.js';



export const SignIn_action=(userData,history)=>{
         return async function(dispatch){
              const {data}=await api.signIn({userData});
              dispatch(addData_action(data));
              localStorage.setItem("profile",JSON.stringify(data));
              history.push('/')
         }
}

export const addData_action=(data=null)=>{
    if(data){
        return{
            type:USER_DATA,
            payload:data
        };
    }
    return{
      type:USER_DATA,
      payload:data
    }
}

export const mobileViews=(data)=>({
       type:MOBILE_VIEW,
       payload:data
})