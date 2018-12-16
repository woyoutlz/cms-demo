import * as Type from "../constants/ActionType.js";

// import FUC from "src/utils/func";

let initialState = {
    next_page: 2,
    data: []
};

export default (state = initialState, action)=>{
  console.log(action, 'action')
    switch (action.type){
        case Type.GET_USER_INFOS:
          console.log(action, '-------action')
            return Object.assign({}, initialState, action.payload)
        default:
            return state;
    }
}

