import "../css/ControlsBox.css";
import { useEffect, useState } from "react";
import Button from "./Button";
import ScoreBar from "./ScoreBar";

function ControlsBox(props) {
  let [fullScreenCaption, setFullScreenCaption] = useState("Fullscreen");

  function toggleFullScreen() {
    props.fullScreenToggler();
  }

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
        <Button id="start" caption="Start" />
        <Button id="pause" caption="Pause" />
        <Button id="end" caption="End" />
        <Button id="settings" caption="Settings" />
        <Button id="fullscreen" caption={fullScreenCaption} onClick={toggleFullScreen} />
        <Button id="howto" caption="How To Play" />
      </div>
    </div>
  );
}

export default ControlsBox;
