import {
  SAVE_TWEETS,
  DEL_TWEETS,
  NEW_TWEETS,
  UPDATE_TWEETS,
} from "../actions/getTweetsAction";
import { removeStorage, setStorage, getStorage } from "../../localStorage";

const tweet = getStorage("alltweets");

const initialState = tweet?.length > 0 ? tweet : [];

const getAllTweets = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TWEETS:
      const index = state.findIndex(
        (state) => state.TEXTID === action.payload.TEXTID
      );
      const updatedTweet = [...state];
      updatedTweet[index] = action.payload;
      return updatedTweet;
    case NEW_TWEETS:
      setStorage("alltweets", action.payload);
      const newTweet = [...state];
      newTweet.splice(0, 0, action.payload);
      return newTweet;
    case SAVE_TWEETS:
      setStorage("alltweets", action.payload);
      return action.payload;
    case DEL_TWEETS:
      removeStorage("alltweets");
      return [];
    default:
      return state;
  }
};

export default getAllTweets;
