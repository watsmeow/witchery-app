//combines all reducers for the project
import { combineReducers } from "redux";

import authReducer from '../reducers/authReducer';
import postReducer from '../reducers/postReducer'
// import postReducer from "./PostReducer";
// import chatReducer from "./ChatUserReducer";

export const reducers = combineReducers({authReducer, postReducer})