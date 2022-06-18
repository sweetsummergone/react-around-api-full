import * as ACTION_TYPES from "../actions/action_type";

export const initialState = {
  isAuth: false,
  currentUser: {},
  token: "",
};

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.EDIT:
      return {
        ...state,
        currentUser: action.data,
      }
    case ACTION_TYPES.LOGIN:
      return {
        ...state,
        isAuth: true,
        currentUser: action.data,
        token: action.token,
      };
    case ACTION_TYPES.LOGOUT:
      return {
        ...state,
        isAuth: false,
        currentUser: {},
        token: "",
      };
    default:
      return state;
  }
};