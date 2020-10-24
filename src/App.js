import React from "react";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";

import AppRouter from "./routes/AppRouter";
import UserProvider from "./utils/UserProvider";

function App() {
  document.body.style.backgroundColor = "#F5F5F5";

  return (
    <div className="App">
      <UserProvider>
        <AppRouter />
      </UserProvider>
    </div>
  );
}

export default App;
