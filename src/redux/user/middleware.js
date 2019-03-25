import { setUser, setAuthError } from "./action";
import { history } from "../../Router/index.jsx";
import { signIn } from "../../api/index.js";
import { setToken } from "../../helpers/tokenHelpers.js";

export const setUserAsync = user => dispatch => {
  signIn(user)
    .then(res => {
      dispatch(setUser(res.data));
      history.push("/home");
      return res.data.token;
    })
    .then(token => {
      setToken(token);
    })
    .catch(err => {
      dispatch(setAuthError(err.response.data.message));
    });
};
