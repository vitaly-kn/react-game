import "../css/ControlsBox.css";
import Button from "./Button";
import ScoreBar from "./ScoreBar";

function ControlsBox(props) {
  return (
    <div className="ControlsBox">
      <ScoreBar score={props.score} tries="3" />
      <div className="buttons">
        <Button id="start" caption="Start" />
        <Button id="pause" caption="Pause" />
        <Button id="end" caption="End" />
        <Button id="settings" caption="Settings" />
        <Button id="fullscreen" caption="Fullscreen" />
        <Button id="howto" caption="How To Play" />
      </div>
    </div>
  );
}

export default ControlsBox;
