const navbarReducer = (state = true, action) => {
  if (action.type === "noNav") return false;
  else if (action.type === "nav") return true;
  else return state;
};
export default navbarReducer;
