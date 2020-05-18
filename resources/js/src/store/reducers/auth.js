import {
    LOAD_USER,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    REG_FAIL,
    REG_SUCCESS,
    REG_ERROR
} from "../actions/types";

// initial state
const initState = {
  isAuthenticated: false,
  user: null,
  profile: null,
  pals: null,
  _token: null,
};

// reducer
const authReducer = (state = initState, action) => {
  // switch case
  switch (action.type) {
    // AUTH_LOG
    case LOAD_USER: return {
        ...state,
        //
    };

    case LOGIN_SUCCESS: return {
        ...state,
        //
    };

    default:
      return { ...state };
  }
};

export default authReducer;