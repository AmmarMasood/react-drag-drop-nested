import React from "react";
import Rooms from "./Components/Rooms";
import "./App.css";
import Nav from "./Components/Nav";
import Check from "./Components/Check";

function App() {
  return (
    <div className="App">
      <div className="App-p"></div>
      <div className="App-main">
        {/* <Check /> */}
        <Nav />
        <Rooms />
      </div>
    </div>
  );
}

export default App;
