import { useState, useEffect } from "react";
import "../css/Game.css";
import PlayScreen from "./PlayScreen";
import ControlsBox from "./ControlsBox";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { GameContext } from "./contexts";

const START_TRIES = 3;

function Game() {
  let [score, setScore] = useState(0);
  let [tries, setTries] = useState(START_TRIES);
  let [pause, setPause] = useState(true);
  let [active, setActive] = useState(false);
  let [restart, setRestart] = useState(true);

  let [fullScreenMode, setFullScreenMode] = useState(false);
  const fullScreenHandle = useFullScreenHandle();

  function incScore() {
    setScore(score + 1);
  }

  function decTries() {
    setTries(tries - 1);
  }

  useEffect(() => {
    if (!tries) setActive(false);
  }, [tries]);

  useEffect(() => {
    if (!active) {
      setScore(0);
      setTries(START_TRIES);
    }
  }, [active]);

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
      <GameContext.Provider value={{ pause, setPause, active, setActive, restart, setRestart }}>
        <div className="Game">
          <PlayScreen incScore={incScore} decTries={decTries} />
          <ControlsBox score={score} tries={tries} fullScreenToggler={fullScreenToggler} />
        </div>
      </GameContext.Provider>
    </FullScreen>
  );
}

export default Game;
