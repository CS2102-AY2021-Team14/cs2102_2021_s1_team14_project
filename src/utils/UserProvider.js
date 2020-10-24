import React, { useState, useEffect, createContext } from "react";

export const UserContext = createContext({});

function UserProvider(props) {
  const [username, setUsername] = useState(null);
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const storageUsername = localStorage.getItem("username");
    const storageAuthToken = localStorage.getItem("authToken");

    setUsername(storageUsername);
    setAuthToken(storageAuthToken);
  }, []);

  return (
    <UserContext.Provider
      value={{
        username,
        authToken,
        setUsername: username => {
          setUsername(username);
          if (username) {
            localStorage.setItem("username", username);
          } else {
            localStorage.removeItem("username");
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
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export default UserProvider;
