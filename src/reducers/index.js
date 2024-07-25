import { combineReducers } from "@reduxjs/toolkit";

import loggedReducer from "./isLogged";
import themeReducer from "./theme";
import userReducer from "./user";
import navbarReducer from "./showNavbar";
import langReducer from "./language";

const allReducers = combineReducers({
  theme: themeReducer,
  lang: langReducer,
  nav: navbarReducer,
  isLogged: loggedReducer,
  user: userReducer,
});

export default allReducers;
