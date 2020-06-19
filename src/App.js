import React from "react";
import Rooms from "./Components/Rooms";
import "./App.css";
import Nav from "./Components/Nav";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="App-p"></div>
        <div className="App-main">
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/rooms" component={Nav} />
          <Route exact path="/rooms" component={Rooms} />
        </div>
      </div>
    </Router>
  );
}

export default App;
