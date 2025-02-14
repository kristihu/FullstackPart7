const initialState = { message: null, type: null };

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return { message: action.payload.message, type: action.payload.type };
    case "CLEAR_NOTIFICATION":
      return initialState;
    default:
      return state;
  }
};

export const setNotification = (message, type, time = 5) => {
  return (dispatch) => {
    dispatch({
      type: "SET_NOTIFICATION",
      payload: { message, type },
    });

    setTimeout(() => {
      dispatch({ type: "CLEAR_NOTIFICATION" });
    }, time * 1000);
  };
};

export default notificationReducer;
