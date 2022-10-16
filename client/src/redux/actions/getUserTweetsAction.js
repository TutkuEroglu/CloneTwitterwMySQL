export const UPDATEUSER_TWEETS = "UPDATEUSER_TWEETS";
export const NEWUSER_TWEETS = "NEWUSER_TWEETS";
export const SAVEUSER_TWEETS = "SAVEUSER_TWEETS";
export const DELUSER_TWEETS = "DELUSER_TWEETS";

export const updateUserTweets = (data) => async (dispatch) => {
  dispatch({
    type: UPDATEUSER_TWEETS,
    payload: data,
  });
};

export const newUserTweets = (data) => async (dispatch) => {
  dispatch({
    type: NEWUSER_TWEETS,
    payload: data,
  });
};

export const saveUserTweets = (data) => async (dispatch) => {
  dispatch({
    type: SAVEUSER_TWEETS,
    payload: data,
  });
};

export const delUserTweets = () => (dispatch) => {
  dispatch({
    type: DELUSER_TWEETS,
  });
};
