import "../css/ControlsBox.css";
import { useEffect, useState, useContext } from "react";
import Button from "./Button";
import ScoreBar from "./ScoreBar";
import { GameContext } from "./contexts";

function ControlsBox(props) {
  let [pauseCaption, setPauseCaption] = useState("Resume");
  let [fullScreenCaption, setFullScreenCaption] = useState("Fullscreen");
  let { pause, setPause } = useContext(GameContext);
  let { active, setActive } = useContext(GameContext);
  let { setRestart } = useContext(GameContext);

  function newGame() {
    if (active) setRestart(true);
    setActive(true);
    setPause(false);
  }

  function endGame() {
    setActive(false);
    setRestart(true);
  }

  function toggleFullScreen() {
    props.fullScreenToggler();
  }

  function togglePause() {
    setPause(!pause);
  }

  useEffect(() => {
    if (pause) {
      setPauseCaption("Resume");
    } else {
      setPauseCaption("Pause");
    }
  }, [pause]);

  useEffect(() => {
    function onFullScreenChange(event) {
      if (fullScreenCaption === "Fullscreen") {
        setFullScreenCaption("Window");
      } else {
        setFullScreenCaption("Fullscreen");
      }
    }

    document.addEventListener("fullscreenchange", onFullScreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", onFullScreenChange);
    };
  });

  return (
    <div className="ControlsBox">
      <ScoreBar score={props.score} tries={props.tries} />
      <div className="buttons">
        <Button disabled="false" id="newgame" caption="New Game" onClick={newGame} />
        <Button disabled={`${!active}`} id="pause" caption={pauseCaption} onClick={togglePause} />
        <Button disabled={`${!active}`} id="end" caption="End" onClick={endGame} />
        <Button disabled="false" id="settings" caption="Settings" />
        <Button disabled="false" id="fullscreen" caption={fullScreenCaption} onClick={toggleFullScreen} />
        <Button disabled="true" id="howto" caption="How To Play" />
      </div>
    </div>
  );
}

export default ControlsBox;
