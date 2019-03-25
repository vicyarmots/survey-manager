import axios from "axios";

export const signIn = ({ email, password }) => {
  return axios.post("http://localhost:3000/sign-in", { email, password });
};
