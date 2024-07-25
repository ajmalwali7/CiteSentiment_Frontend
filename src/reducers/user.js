const userReducer = (
  state = JSON.parse(localStorage.getItem("user")),
  action
) => {
  if (action.type === "user") {
    state = { ...action.payload };
    return state;
  } else if (action.type === "null") {
    return action.payload;
  } else {
    return state;
  }
};
export default userReducer;
