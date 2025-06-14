import axios from "../axios";

export const registerUser = (user) => async (dispatch) => {
  dispatch({ type: "USER_REGIISTER_REQUEST" });

  try {
    const res = await axios.post("/api/users/register", user);
    dispatch({ type: "USER_REGISTER_SUCCESS" });
  } catch (error) {
    dispatch({ type: "USER_REGISTER_FAILED", payload: error });
  }
};

export const loginUser = (user) => async (dispatch) => {
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

export const logoutUser = () => (dispatch) => {
  localStorage.clear();
  window.location.href = "/";
};

export const getAllUsers = () => async (dispatch) => {
  dispatch({ type: "GET_USERS_REQUEST" });

  try {
    const { data } = await axios.get("/api/users/getallusers");
    dispatch({ type: "GET_USERS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "GET_USERS_FAILED", payload: error });
  }
};

export const deleteUser = (userid) => async (dispatch) => {
  try {
    await axios.post("/api/users/deleteuser", { userid });
    alert("User Deleted successfully");
    window.location.reload();
  } catch (error) {
    alert(`Something went wrong`);
    console.log(error);
  }
};