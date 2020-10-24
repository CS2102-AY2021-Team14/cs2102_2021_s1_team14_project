import React, { Fragment, useState, useContext } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PublicRoute from "./PublicRoute";
import PrivatePetOwnerRoute from "./PrivatePetOwnerRoute";
import ROUTES from "./Routes";

import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import Register from "../pages/Register";

import { UserContext } from "../utils/UserProvider";

import PetOwnerHome from "../pages/petowner/PetOwnerHome";

const AppRouter = () => {
  const { username, authToken, roles } = useContext(UserContext);
  // ^ use these to determine whether logged in or not and what role (roles is an array)
  // roles can be an array containing these stuff ["Pet Owner", "Full-time Care Taker", "Part-time Care Taker", "PCS Admin"]

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

  return (
    <Fragment>
      <ToastContainer />
      <BrowserRouter>
        <Switch>
          {/* <PublicRoute path={ROUTES.SIGN_IN} component={SignIn} />
          <PublicRoute path={ROUTES.REGISTER} component={Register} setAuth={setAuth} />

          <PrivatePetOwnerRoute path={ROUTES.PET_OWNER_HOME} component={PetOwnerHome} />
          <PublicRoute path={ROUTES.HOME} exact={true} component={Home} /> */}
          <Route
            path={ROUTES.REGISTER}
            render={props =>
              !isAuthenticated ? (
                <Register {...props} setAuth={setAuth} />
              ) : (
                <Redirect to={ROUTES.SIGN_IN} />
              )
            }
          />
          <Route
            path={ROUTES.SIGN_IN}
            render={props =>
              !isAuthenticated ? (
                <SignIn {...props} setAuth={setAuth} />
              ) : (
                <Redirect to={ROUTES.PET_OWNER_HOME} />
              )
            }
          />
          <Route
            path={ROUTES.PET_OWNER_HOME}
            render={props =>
              isAuthenticated ? (
                <PetOwnerHome {...props} />
              ) : (
                <Redirect to={ROUTES.SIGN_IN} />
              )
            }
          />
          <PublicRoute path={ROUTES.HOME} exact={true} component={Home} />
        </Switch>
      </BrowserRouter>
    </Fragment>
  );
};

export default AppRouter;
