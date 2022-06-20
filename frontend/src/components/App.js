import React, { Fragment, useEffect, useState, useReducer } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import spinner from "../images/spinner.svg";

import * as auth from "../utils/auth";
import * as ACTIONS from "../store/actions/actions";
import * as AuthReducer from "../store/reducers/authReducer";

import CurrentUserContext from "../contexts/CurrentUserContext";

import Content from "./Content";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import Logout from "./Logout";

function App() {
  const [stateAuthReducer, dispatchAuthReducer] = useReducer(
    AuthReducer.AuthReducer,
    AuthReducer.initialState
  );
  const [isDataLoading, setIsDataLoading] = useState(true);

  const checkToken = (token) => {
    return auth.checkToken(token);
  };

  const handleLogin = (token) => {
    checkToken(token)
    .then((user) => {
      if (user.email) {
        dispatchAuthReducer(ACTIONS.login({ user, token }));
      }
    })
    .catch((err) => console.error(err));
  };

  const handleLogout = () => {
    dispatchAuthReducer(ACTIONS.logout());
    auth.logout();
  };

  const handleEdit = (data) => {
    dispatchAuthReducer(ACTIONS.edit(data));
  }

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      const token = localStorage.getItem("jwt");
      checkToken(token)
        .then((user) => {
          if (user.email) {
            dispatchAuthReducer(ACTIONS.login({ user, token }));
          }
        })
        .catch((err) => console.error(err))
        .finally(() => setIsDataLoading(false));
    } else {
      setIsDataLoading(false);
    }
  }, []);

  if (isDataLoading) {
    return (
      <div className='loading'>
        <img src={spinner} alt='Loading spinner' className='loading__spinner' />
      </div>
    );
  }
  return (
    <CurrentUserContext.Provider
      value={{
        isAuth: stateAuthReducer.isAuth,
        currentUser: stateAuthReducer.currentUser,
        token: stateAuthReducer.token,
        handleUserLogin: (token) => handleLogin(token),
        handleUserLogout: () => handleLogout(),
        handleUserEdit: (data) => handleEdit(data)
      }}
    >
      <BrowserRouter>
        <Fragment>
          <Routes>
            <Route
              exact
              path='/main'
              element={
                <ProtectedRoute
                  loggedIn={stateAuthReducer.isAuth}
                  component={Content}
                />
              }
            />
            <Route
              path='/signup'
              element={
                stateAuthReducer.isAuth ? <Navigate to='/main' /> : <Register />
              }
            />
            <Route
              path='/signin'
              element={
                stateAuthReducer.isAuth ? <Navigate to='/main' /> : <Login />
              }
            />
            <Route
              path='/signout'
              element={
                stateAuthReducer.isAuth ? <Logout /> : <Navigate to='/signin' />
              }
            />
            <Route
              path='/*'
              element={
                stateAuthReducer.isAuth ? (
                  <Navigate to='/main' />
                ) : (
                  <Navigate to='/signin' />
                )
              }
            />
          </Routes>
        </Fragment>
      </BrowserRouter>
    </CurrentUserContext.Provider>
  );
}

export default App;
