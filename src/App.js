import React from "react";
import Servers from "./components/Servers";
import ParticleComponent from "./components/ParticleComponent";
import { SummonerContextProvider } from "./contexts/SummonerContext";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./styles.css";

const App = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <ParticleComponent />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      ></div>
      <Router>
        <SummonerContextProvider>
          <Switch>
            <Route exact path="/" component={Servers} />
          </Switch>
        </SummonerContextProvider>
      </Router>
    </div>
  );
};
export default App;
