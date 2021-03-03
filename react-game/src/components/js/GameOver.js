import "../css/ModalContainer.css";
import "../css/GameOver.css";
import { useContext } from "react";
import Button from "./Button";
import { GameContext } from "./contexts";

function GameOver(props) {
  let { setGameOver } = useContext(GameContext);
  let { setRestart } = useContext(GameContext);

  function closeWindow() {
    setRestart(true);
    setGameOver(false);
  }

  return (
    <div className="ModalContainer">
      <div className="GameOver">
        <h2>Game Over</h2>
        <p>Your score is : {props.score}</p>
        <Button disabled="false" id="gameOverOk" caption="Ok" onClick={closeWindow} />
      </div>
    </div>
  );
}

export default GameOver;
