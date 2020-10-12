import React from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import AppRouter from "./routes/AppRouter";

function App() {
  document.body.style.backgroundColor = "#F5F5F5";

  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
