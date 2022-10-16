export const UPDATE_TWEETS = "UPDATE_TWEETS";
export const NEW_TWEETS = "NEW_TWEETS";
export const SAVE_TWEETS = "SAVE_TWEETS";
export const DEL_TWEETS = "DEL_TWEETS";

export const UpdateTweets = (data) => async (dispatch) => {
  dispatch({
    type: UPDATE_TWEETS,
    payload: data,
  });
};

export const newTweets = (data) => async (dispatch) => {
  dispatch({
    type: NEW_TWEETS,
    payload: data,
  });
};

export const saveTweets = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_TWEETS,
    payload: data,
  });
};

export const delTweets = () => (dispatch) => {
  dispatch({
    type: DEL_TWEETS,
  });
};
