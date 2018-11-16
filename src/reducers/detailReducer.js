import * as Type from "../constants/ActionType.js";

// import FUC from "src/utils/func";

let initialState = {
    data: {}
};

export default (state = initialState, action)=>{
    switch (action.type){
        case Type.GET_FORM:
            return Object.assign({}, initialState, action.payload)
        default:
            return state;
    }
}

