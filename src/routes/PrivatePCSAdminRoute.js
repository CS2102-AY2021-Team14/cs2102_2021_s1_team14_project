import React, { useState, useEffect, useContext } from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import { UserContext } from "../utils/UserProvider";

import ROUTES from "./Routes";

import PcsAdminHome from "../pages/pcsadmin/PcsAdminHome";
import PcsAdminCareTaker from "../pages/pcsadmin/PcsAdminCareTaker";

const PrivatePCSAdminRoute = props => {
  const { username, authToken, roles } = useContext(UserContext);
  // ^ use these to determine whether logged in or not and what role (roles is an array)
  // roles can be an array containing these stuff ["Pet Owner", "Full-time Care Taker", "Part-time Care Taker", "PCS Admin"]

  const [auth, setAuth] = useState(null);
  const [userRoles, setUserRoles] = useState([]);

  useEffect(() => {
    if (username && authToken) {
      setAuth({ username, authToken });
    }
  }, [username, authToken]);

  useEffect(() => {
    setUserRoles(roles);
  }, [roles]);

  const isAuthenticated = () => {
    return auth != null;
  };

  const isPcsAdmin = () => {
    return userRoles.includes("PCS Admin");
  };

  return (
    <Route
      {...props}
      render={props => {
        if (isAuthenticated() && isPcsAdmin()) {
          return (
            <Switch>
              <Route exact path={ROUTES.ADMIN_HOME}>
                <PcsAdminHome />
              </Route>

              <Route exact path={ROUTES.ADMIN_CARE_TAKER}>
                <PcsAdminCareTaker />
              </Route>
            </Switch>
          );
        } else {
          return <div>You are unauthorized!</div>; // TODO: Have a nice looking unauthorized page
        }
      }}
    />
  );
};

export default PrivatePCSAdminRoute;
