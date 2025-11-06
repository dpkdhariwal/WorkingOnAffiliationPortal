import axios from "../axios_custom";

export const loginUser = (user) => (dispatch) => {
  console.log("User login action called with user:", user);

  dispatch({ type: "USER_LOGIN_REQUEST" });

  axios
    .post("/auth/login", user)
    .then((response) => {
      const data = response.data;
      if (data.error) {
        dispatch({ type: "USER_LOGIN_FAILED", payload: data.error });
        alert(data.error);
      } else {
        dispatch({ type: "USER_LOGIN_SUCCESS", payload: data });
        localStorage.setItem("currentUser", JSON.stringify(data));
        // window.location.href = "/";
      }
    })
    .catch((error) => {
      dispatch({ type: "USER_LOGIN_FAILED", payload: error });
    });
};


