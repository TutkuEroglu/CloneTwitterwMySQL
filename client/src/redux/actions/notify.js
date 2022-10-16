export const SET_NOTIFY = "SET_NOTIFY";
export const DEL_NOTIFY = "DEL_NOTIFY";

export const setNotify = (data) => async (dispatch) => {
  dispatch({
    type: SET_NOTIFY,
    payload: data,
  });
};

export const delNotify = () => (dispatch) => {
  dispatch({
    type: DEL_NOTIFY,
  });
};
