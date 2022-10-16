export const SIGN_OUT = "SIGN_OUT";
export const SIGN_IN = "SIGN_IN";

export const signIn = (data) => async (dispatch) => {
  dispatch({
    type: SIGN_IN,
    payload: data,
  });
};

export const signOut = () => (dispatch) => {
  dispatch({
    type: SIGN_OUT,
  });
};
