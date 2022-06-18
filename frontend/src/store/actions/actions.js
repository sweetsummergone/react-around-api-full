import * as ACTION_TYPES from "../actions/action_type";

export const login = ({user, token}) => {
    return {
      type: ACTION_TYPES.LOGIN,
      data: user,
      token: token,
    };
  };
  
  export const logout = () => {
    localStorage.removeItem("jwt");
    return {
      type: ACTION_TYPES.LOGOUT,
    };
  };

  export const edit = (user) => {
    return {
      type: ACTION_TYPES.EDIT,
      data: user,
    }
  }