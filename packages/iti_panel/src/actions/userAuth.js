import axios from "../axios";

export const loginUser = (user) => async (dispatch) => {


  console.log("User login action called with user:", user);


  dispatch({ type: "USER_LOGIN_REQUEST" });

  try {
    const { data } = await axios.post("/api/users/login", user);
    if (data.error) {
      dispatch({ type: "USER_LOGIN_FAILED", payload: data.error });
      return alert(data.error);
    } else {
      dispatch({ type: "USER_LOGIN_SUCCESS", payload: data });
      localStorage.setItem("currentUser", JSON.stringify(data));
      window.location.href = "/";
    }
  } catch (error) {
    dispatch({ type: "USER_LOGIN_FAILED", payload: error });
  }
};
