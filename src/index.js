import React from "react";
import ReactDOM from "react-dom";

import { Game } from "./r/game";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <h1>React Tutorial - Tic Tac Toe</h1>
      <h2>A follow-along react adventure!</h2>

      <Game />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
