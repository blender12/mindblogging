import {USER_DATA} from '../types/userTypes';
const initialUser="";
const userReducer=(state=initialUser,action)=>{
  
    switch(action.type){
        case USER_DATA:{
            if(action.payload===null){
                return null;
            }
            else{
                return{...action.payload}
            }
        }

        default: return state;
    }
}

export default userReducer;