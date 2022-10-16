import { SIGN_IN, SIGN_OUT } from "../actions";
import { removeStorage, setStorage, getStorage } from "../../localStorage";

const user = getStorage("user");

const initialState = user
  ? {
      isLoggedIn: true,
      USERID: user.USERID,
      USERNAME: user.USERNAME,
      AUTHORITY: user.AUTHORITY,
      NAME: user.NAME,
      INFORMATION: user.INFORMATION,
      LOCATION: user.LOCATION,
      WEBSITE: user.WEBSITE,
      BIRTHDAY: user.BIRTHDAY,
    }
  : {
      isLoggedIn: false,
      USERID: null,
      USERNAME: "",
      AUTHORITY: "",
      NAME: "",
      INFORMATION: "",
      LOCATION: "",
      WEBSITE: "",
      BIRTHDAY: "",
    };

const LoggedReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      setStorage("user", action.payload);
      return {
        ...state,
        isLoggedIn: true,
        USERID: action?.payload?.USERID,
        USERNAME: action?.payload?.USERNAME,
        AUTHORITY: action?.payload?.AUTHORITY,
        NAME: action?.payload?.NAME,
        INFORMATION: action?.payload?.INFORMATION,
        LOCATION: action?.payload?.LOCATION,
        WEBSITE: action?.payload?.WEBSITE,
        BIRTHDAY: action?.payload?.BIRTHDAY,
      };
    case SIGN_OUT:
      removeStorage("user");
      return {
        ...state,
        isLoggedIn: false,
        USERID: null,
        USERNAME: "",
        AUTHORITY: "",
        NAME: "",
        INFORMATION: "",
        LOCATION: "",
        WEBSITE: "",
        BIRTHDAY: "",
      };
    default:
      return state;
  }
};

export default LoggedReducer;
