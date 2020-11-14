import React, { useState, useEffect, useContext } from "react";
import { Route, Switch } from "react-router-dom";

import { UserContext } from "../utils/UserProvider";

import ROUTES from "./Routes";

import CareTakerHome from "../pages/caretaker/CareTakerHome";
import CareTakerSalary from "../pages/caretaker/CareTakerSalary";
import CareTakerHistory from "../pages/caretaker/CareTakerHistory";
import CareTakerOffers from '../pages/caretaker/CareTakerOffers';
import CareTakerAvailability from "../pages/caretaker/CareTakerAvailability";

const PrivateCareTakerRoute = props => {
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

  const isCareTaker = () => {
    return (
      userRoles.includes("Full-time Care Taker") ||
      userRoles.includes("Part-time Care Taker")
    );
  };

  return (
    <Route
      {...props}
      render={props => {
        if (isAuthenticated() && isCareTaker()) {
          return (
            <Switch>
              <Route exact path={ROUTES.CARE_TAKER_HOME}>
                <CareTakerHome />
              </Route>

              <Route exact path={ROUTES.CARE_TAKER_HISTORY}>
                <CareTakerHistory />
              </Route>

              <Route exact path={ROUTES.CARE_TAKER_SALARY}>
                <CareTakerSalary />
              </Route>

              <Route exact path={ROUTES.CARE_TAKER_OFFERS}>
                <CareTakerOffers />
              </Route>

              <Route exact path={ROUTES.CARE_TAKER_AVAILABILITY}>
                <CareTakerAvailability />
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

export default PrivateCareTakerRoute;
