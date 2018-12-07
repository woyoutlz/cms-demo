import * as Type from "../constants/ActionType.js";

// import FUC from "src/utils/func";

let initialState = {
    data: {}
};

export default (state = initialState, action)=>{
    switch (action.type){
        case Type.UPLOADIMGARRAY:
            let detailImg = {detailImg: action.payload};
            return Object.assign({}, initialState, detailImg)
        default:
            return state;
    }
}

