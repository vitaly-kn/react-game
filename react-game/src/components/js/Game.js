import "../css/Game.css";
import PlayScreen from "./PlayScreen";
import ControlsBox from "./ControlsBox";

function Game() {
  return (
    <div className="Game">
      <PlayScreen />
      <ControlsBox />
    </div>
  );
}

export default Game;
