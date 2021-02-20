import {MOBILE_VIEW} from '../types/userTypes'

let intialstate=false;
const mobReducers=(state=intialstate,action)=>{
    switch(action.type){
        case MOBILE_VIEW:return action.payload;
        default:return state
    }
}

export default mobReducers;