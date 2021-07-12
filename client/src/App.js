import React from "react";
import './App.css';
import Search from "./components/Search/Search.js"
import Landing from "./components/Landing/Landing.js"
import { Route } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <Landing />
      <Route exact path="/home" component={Search} />
        <div className="App">
        </div>
    </React.Fragment>
  );
}


export default App;
