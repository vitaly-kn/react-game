import { useState, useEffect } from "react";
import "../css/Game.css";
import PlayScreen from "./PlayScreen";
import ControlsBox from "./ControlsBox";
import GameOver from "./GameOver";
import Settings from "./Settings";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { GameContext } from "./contexts";

const initialValues = {
  tries: 3,
  cadence: 10000,
  sound: "true",
};

function Game() {
  let [score, setScore] = useState(0);
  let [tries, setTries] = useState(getInitialValue("tries"));
  let [cadence, setCadence] = useState(getInitialValue("cadence"));
  let [maxTries, setMaxTries] = useState(getInitialValue("tries"));
  let [pause, setPause] = useState(true);
  let [active, setActive] = useState(false);
  let [restart, setRestart] = useState(true);
  let [gameOver, setGameOver] = useState(false);
  let [settings, setSettings] = useState(false);
  let [soundEnabled, setSoundEnabled] = useState(getInitialValue("sound"));

  let [fullScreenMode, setFullScreenMode] = useState(false);
  const fullScreenHandle = useFullScreenHandle();

  function getInitialValue(item) {
    if (localStorage.getItem(item)) {
      return localStorage.getItem(item);
    }
    return initialValues[item];
  }

  function incScore() {
    setScore(score + 1);
  }

  function decTries() {
    setTries(tries - 1);
  }

  useEffect(() => {
    if (!tries) {
      setActive(false);
      setGameOver(true);
    }
  }, [tries]);

  useEffect(
    () => {
      if (restart) {
        setScore(0);
        setTries(maxTries);
      }
    },
    // eslint-disable-next-line
    [restart]
  );

  useEffect(() => {
    setTries(maxTries);
  }, [maxTries]);

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
      <GameContext.Provider
        value={{
          pause,
          setPause,
          active,
          setActive,
          restart,
          setRestart,
          gameOver,
          setGameOver,
          settings,
          setSettings,
          maxTries,
          setMaxTries,
          cadence,
          setCadence,
          soundEnabled,
          setSoundEnabled,
        }}
      >
        <div className="Game">
          <PlayScreen incScore={incScore} decTries={decTries} />
          <ControlsBox score={score} tries={tries} fullScreenToggler={fullScreenToggler} />
          {gameOver && <GameOver score={score} />}
          {settings && <Settings />}
        </div>
      </GameContext.Provider>
    </FullScreen>
  );
}

export default Game;
