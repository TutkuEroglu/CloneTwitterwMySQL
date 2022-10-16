import { configureStore } from "@reduxjs/toolkit";
import LoggedReducer from "./reducers/isLogged";
import getAllTweets from "./reducers/getAllTweets";
import getAllUserTweets from "./reducers/getUserTweets";
import notification from "./reducers/notification";

const store = configureStore({
  reducer: {
    AUTH: LoggedReducer,
    TWEETS: getAllTweets,
    USERTWEETS: getAllUserTweets,
    Notify: notification,
  },
});

export default store;
