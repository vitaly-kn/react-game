import "../css/Board.css";
import board from "../../assets/img/cutting-board.svg";
import { useEffect, useState } from "react";

const boardStep = 9;
const boardWidth = 15; //in rem
const maxBoardLeft = 36;

function Board(props) {
  let [left, setLeft] = useState(0);
  let [keyStuck, setStuck] = useState(false);

  useEffect(() => {
    function onKeyDown(event) {
      if (keyStuck) return;
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
      if (left !== newLeft) setLeft(newLeft);
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

  function onBoardTrackClick(event) {
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
    let newLeft = (event.clientX - event.currentTarget.getBoundingClientRect().x) / rem - boardWidth / 2;
    newLeft = newLeft < 0 ? 0 : newLeft;
    newLeft = newLeft > maxBoardLeft ? maxBoardLeft : newLeft;
    setLeft(newLeft);
  }

  return (
    <div className="Board" onClick={onBoardTrackClick}>
      <img className="board-image" style={{ left: `${left}rem` }} src={board} alt="board" />
    </div>
  );
}

export default Board;
