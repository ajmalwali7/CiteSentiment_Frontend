import en from "../assets/docs/langs/en.json";

// const lang = localStorage.getItem("lang");
let initialState = en;

const langReducer = (state = initialState, action) => {
  if (action.type === "en") return en;
  else return state;
};
export default langReducer;
