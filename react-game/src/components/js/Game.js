import { useState } from "react";
import "../css/Game.css";
import PlayScreen from "./PlayScreen";
import ControlsBox from "./ControlsBox";

function Game() {
  let [score, setScore] = useState(0);

  function incScore() {
    setScore(score + 1);
  }

  return (
    <div className="Game">
      <PlayScreen incScore={incScore} />
      <ControlsBox score={score} />
    </div>
  );
}

export default Game;
