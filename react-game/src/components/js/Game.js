import { useState } from "react";
import "../css/Game.css";
import PlayScreen from "./PlayScreen";
import ControlsBox from "./ControlsBox";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

function Game() {
  let [score, setScore] = useState(0);
  let [tries, setTries] = useState(3);

  let [fullScreenMode, setFullScreenMode] = useState(false);
  const fullScreenHandle = useFullScreenHandle();

  function incScore() {
    setScore(score + 1);
  }

  function decTries() {
    setTries(tries - 1);
  }

  function fullScreenToggler() {
    setFullScreenMode(!fullScreenMode);
    if (!fullScreenMode) {
      fullScreenHandle.enter();
    } else {
      fullScreenHandle.exit();
    }
  }

  return (
    <FullScreen handle={fullScreenHandle}>
      <div className="Game">
        <PlayScreen incScore={incScore} decTries={decTries} />
        <ControlsBox score={score} tries={tries} fullScreenToggler={fullScreenToggler} />
      </div>
    </FullScreen>
  );
}

export default Game;
