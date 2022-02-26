import {combineReducers} from "redux";

import UserListReducer from "./UserReducer";

const RootReducer = combineReducers({

    UserList: UserListReducer,

});

export default RootReducer;
