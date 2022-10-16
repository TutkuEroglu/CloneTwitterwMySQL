import { SET_NOTIFY, DEL_NOTIFY } from "../actions/notify";
import { removeStorage, setStorage, getStorage } from "../../localStorage";

const notify = getStorage("notification");

const initialState = notify
  ? {
      isNotification: notify,
    }
  : {
      isNotification: false,
    };

const notification = (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTIFY:
      setStorage("notification", action.payload);
      return {
        ...state,
        isNotification: action.payload,
      };
    case DEL_NOTIFY:
      removeStorage("notification");
      return {
        ...state,
        isNotification: false,
      };
    default:
      return state;
  }
};

export default notification;
