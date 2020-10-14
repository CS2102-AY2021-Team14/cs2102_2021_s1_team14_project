import React from "react";
import { Route, Redirect } from "react-router-dom";

import ROUTES from "./Routes";

export const PrivateCareTakerRoute = ({ component: Component, ...rest }) => {
  let auth = localStorage.getItem("yogapets-token");

  // const token = jwt.decode(auth);
  // if (!token) {
  //   return <Redirect to={CONFIG.SIGN_IN_PAGE} />;
  // }

  const isCareTaker = true; //token.role === "caretaker";
  return (
    <Route
      {...rest}
      component={props =>
        isCareTaker ? (
          <div>
            <Component {...props} />
          </div>
        ) : (
          <Redirect to={ROUTES.HOME} />
        )
      }
    />
  );
};

export default PrivateCareTakerRoute;
