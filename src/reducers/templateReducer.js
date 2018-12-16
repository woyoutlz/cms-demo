import * as Type from "../constants/ActionType.js";

// import FUC from "src/utils/func";

let initialState = {
    next_page: 2,
    data: []
};

export default (state = initialState, action)=>{
  switch (action.type){
    case Type.GET_TEMPLATE_LIST:
      return Object.assign({}, initialState, action.payload)
    default:
      return state;
  }
}

