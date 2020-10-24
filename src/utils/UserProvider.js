import React, { useState, useEffect, createContext } from "react";

export const UserContext = createContext({});

function UserProvider(props) {
  const [username, setUsername] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [roles, setRoles] = useState([]); // ["Pet Owner", "Full-time Care Taker", "Part-time Care Taker", "PCS Admin"]

  useEffect(() => {
    const storageUsername = localStorage.getItem("username");
    const storageAuthToken = localStorage.getItem("authToken");
    const storageRoles = JSON.parse(localStorage.getItem("roles"));

    setUsername(storageUsername);
    setAuthToken(storageAuthToken);

    if (storageRoles) {
      setRoles(storageRoles);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        username,
        authToken,
        roles,
        setUsername: username => {
          setUsername(username);
          if (username) {
            localStorage.setItem("username", username);
          } else {
            localStorage.removeItem("username");
            localStorage.removeItem("roles");
          }
        },
        setAuthToken: authToken => {
          setAuthToken(authToken);
          if (authToken) {
            localStorage.setItem("authToken", authToken);
          } else {
            localStorage.removeItem("authToken");
          }
        },
        setRoles: roles => {
          setRoles(roles);
          if (roles) {
            localStorage.setItem("roles", JSON.stringify(roles));
          }
        },
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export default UserProvider;
