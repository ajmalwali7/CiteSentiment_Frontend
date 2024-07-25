const theme = localStorage.getItem("theme");
let initialTheme = "light";
if (theme === "dark") initialTheme = "dark";

const themeReducer = (state = initialTheme, action) => {
  if (action.type === "dark" && state === "light") return "dark";
  else if (action.type === "light" && state === "dark") return "light";
  else return state;
};
export default themeReducer;
