import { combineReducers } from "redux";

import usersReducer from "./usersReducer";
import productsReducer from "./productsReducer";
import cartReducer from "./cartReducer";

const mainReducer = combineReducers({
  usersReducer,
  productsReducer,
  cartReducer,
});

export default mainReducer;
