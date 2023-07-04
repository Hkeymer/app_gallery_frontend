import { TYPES } from "../actions/types";

const initialState = {
    id_category:null,
    update_component:false
};


export const reducerImage = (state=initialState,action)=>{
    switch (action.type) {
      
        case TYPES.SET_ID_CATEGORY:  
            return{
               ...state,
                id_category: action.payload
                }
        case TYPES.UPDATE_COMPONENT:  
            return{
               ...state,
                update_component: !action.payload
                }
        default:
            return state;
    }
    
}