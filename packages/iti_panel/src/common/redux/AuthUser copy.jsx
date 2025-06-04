let initialState = {
  userTyp: null
};

const RegApp = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "setAuth":
      return {
        ...state,
        userTyp: payload.userType, // Correctly update userTyp
      };

    default:
      return state;
  }
};

export default RegApp;
