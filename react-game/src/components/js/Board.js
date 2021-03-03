import "../css/Board.css";
import board from "../../assets/img/cutting-board.svg";
import { useEffect, useState, useContext } from "react";
import { GameContext } from "./contexts";

const boardStep = 9;
const boardWidth = 15; //in rem

function Board(props) {
  let [left, setLeft] = useState(0);
  let [keyStuck, setStuck] = useState(false);
  let { pause } = useContext(GameContext);
  let { active } = useContext(GameContext);
  let [maxBoardLeft, setMaxBoardLeft] = useState(0);

  useEffect(() => {
    function onKeyDown(event) {
      if (!active || pause || keyStuck) return;
      setStuck(true);
      let newLeft = left;
      if (event.keyCode === 37) {
        //key "Arrow Left"
        newLeft -= boardStep;
        newLeft = newLeft < 0 ? 0 : newLeft;
      } else if (event.keyCode === 39) {
        //key "Arrow Right"
        newLeft += boardStep;
        newLeft = newLeft > maxBoardLeft ? maxBoardLeft : newLeft;
      }
      if (left !== newLeft) {
        setLeft(newLeft);
      }
    }

    function onKeyUp() {
      setStuck(false);
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  });

  useEffect(
    () => {
      props.getBoardInstance(document.getElementById("board-image"));
    },
    // eslint-disable-next-line
    []
  );

  // eslint-disable-next-line
  useEffect(() => {
    function getMaxBoardLeftPosition() {
      const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
      const board = document.getElementById("board");
      return (board.getBoundingClientRect().right - board.getBoundingClientRect().left) / rem - boardWidth;
    }
    setMaxBoardLeft(getMaxBoardLeftPosition());
  });

  function onBoardTrackClick(event) {
    if (!active || pause) return;
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
    let newLeft = (event.clientX - event.currentTarget.getBoundingClientRect().x) / rem - boardWidth / 2;
    newLeft = newLeft < 0 ? 0 : newLeft;
    newLeft = newLeft > maxBoardLeft ? maxBoardLeft : newLeft;
    setLeft(newLeft);
  }

  return (
    <div className="Board" id="board" onClick={onBoardTrackClick}>
      <img className="board-image" id="board-image" style={{ left: `${left}rem` }} src={board} alt="board" />
    </div>
  );
}

export default Board;
