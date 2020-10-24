import React, { useState, useEffect, useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import ROUTES from "./Routes";

import { UserContext } from "../utils/UserProvider";

// No authentication required
export const PublicRoute = ({ path, component: Component, ...rest }) => {
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

  const isAuthenticated = () => auth != null;

  const isPetOwner = () => userRoles.includes("Pet Owner");
  const isCareTaker = () =>
    userRoles.includes("Full-time Care Taker") ||
    userRoles.includes("Part-time Care Taker");
  const isPcsAdmin = () => userRoles.includes("PCS Admin");

  const getUserRoleRoute = () => {
    if (isPetOwner()) {
      return ROUTES.PET_OWNER_HOME;
    } else if (isCareTaker()) {
      return ROUTES.CARE_TAKER_HOME;
    } else if (isPcsAdmin()) {
      return ROUTES.ADMIN_HOME;
    } else {
      return ROUTES.HOME;
    }
  };

  return (
    <Route
      {...rest}
      path={path}
      render={props =>
        // !isAuthenticated() || path == ROUTES.HOME ? (
        !isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to={getUserRoleRoute()} />
        )
      }
    />
  );
};

export default PublicRoute;
