const getCookieValue = (name) =>
  document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || "";
const loggedReducer = (
  state = getCookieValue("jwt") && JSON.parse(localStorage.getItem("user"))
    ? true
    : false,
  action
) => {
  switch (action.type) {
    case "log-in":
      if (getCookieValue("jwt") && JSON.parse(localStorage.getItem("user")))
        return true;
      else return false;
    case "log-out":
      document.cookie = `jwt=; max-age=${new Date(Date.now + 3 * 1000)}`;
      localStorage.removeItem("user");
      return false;
    default:
      return state;
  }
};
export default loggedReducer;
