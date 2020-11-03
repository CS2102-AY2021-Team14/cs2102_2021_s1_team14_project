import React, { useState, useEffect, useContext } from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import { UserContext } from "../utils/UserProvider";

import ROUTES from "./Routes";
import PetOwnerHome from "../pages/petowner/PetOwnerHome";
import PetOwnerSearch from "../pages/petowner/PetOwnerSearch";
import PetOwnerPets from "../pages/petowner/PetOwnerPets";

const PrivatePetOwnerRoute = props => {
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

  const isPetOwner = () => {
    return userRoles.includes("Pet Owner");
  };

  return (
    <Route
      {...props}
      render={props => {
        if (isAuthenticated() && isPetOwner()) {
          return (
            <Switch>
              <Route exact path={ROUTES.PET_OWNER_HOME}>
                <PetOwnerHome />
              </Route>

              <Route exact path={ROUTES.PET_OWNER_SEARCH}>
                <PetOwnerSearch />
              </Route>

              <Route exact path={ROUTES.PET_OWNER_PETS}>
                <PetOwnerPets username={username} />
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

export default PrivatePetOwnerRoute;
