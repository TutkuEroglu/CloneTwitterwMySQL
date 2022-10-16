import {
  SAVEUSER_TWEETS,
  DELUSER_TWEETS,
  NEWUSER_TWEETS,
  UPDATEUSER_TWEETS,
} from "../actions/getUserTweetsAction";
import { removeStorage, setStorage, getStorage } from "../../localStorage";

const usertweet = getStorage("usertweets");

const initialState = usertweet?.length > 0 ? usertweet : [];

const getAllUserTweets = (state = initialState, action) => {
  switch (action.type) {
    case UPDATEUSER_TWEETS:
      const index = state.findIndex(
        (state) => state.TEXTID === action.payload.TEXTID
      );
      const updatedTweet = [...state];
      updatedTweet[index] = action.payload;
      return updatedTweet;
    case NEWUSER_TWEETS:
      setStorage("usertweets", action.payload);
      const newTweet = [...state];
      newTweet.splice(0, 0, action.payload);
      return newTweet;
    case SAVEUSER_TWEETS:
      setStorage("usertweets", action.payload);
      return action.payload;
    case DELUSER_TWEETS:
      removeStorage("usertweets");
      return [];
    default:
      return state;
  }
};

export default getAllUserTweets;
