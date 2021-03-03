//import dresser from "../../assets/img/dresser.svg";
//import stove from "../../assets/img/stove.svg";
import "../css/PlayScreen.css";
import Cadencer from "./Cadencer";
import Apple from "./Apple";
import Board from "./Board";
import { useEffect, useState } from "react";

const BASIC_CADENCE = 10000;
let cadencer = new Cadencer(null, BASIC_CADENCE);
const colors = ["red", "yellow", "green"];
const trajectories = ["trajectory1", "trajectory2", "trajectory3"];
const animationWin = "left-right-frames";
const animationsJumpTemplate = "up-down-frames";

function PlayScreen(props) {
  //console.log("PlayScreen!");

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  let [apples, setNewApples] = useState([]);
  let [board, setBoard] = useState(null);

  function getBoardInstance(DOMElement) {
    setBoard(DOMElement);
  }

  function addNewApple() {
    //console.log(`tick!`);
    const color = colors[getRandomInt(0, colors.length - 1)];
    const trajectory = trajectories[getRandomInt(0, trajectories.length - 1)];
    setNewApples([...apples, { color, trajectory, key: Date.now() }]);
    return;
  }

  cadencer.setCallback(addNewApple);

  useEffect(() => cadencer.start());

  function onAppleAnimationEnd(event) {
    //event.currentTarget.classList.add("freeze");
    const animation = event.animationName;
    if (animation === animationWin) {
      props.incScore();
      removeApple();
    } else if (animation.includes(animationsJumpTemplate)) {
      if (isAppleAndBoardCollide()) {
        restartVerticalAnimation();
      } else {
        event.currentTarget.classList.add("fall");
      }
    } else {
      props.decTries();
      removeApple();
    }

    function removeApple() {
      const key = event.currentTarget.dataset.key;
      setNewApples(
        apples.filter((apple) => {
          return Number(apple.key) !== Number(key);
        })
      );
    }

    function restartVerticalAnimation() {
      event.currentTarget.classList.remove(`trajectory${animation[animation.length - 1]}`);
      void event.currentTarget.offsetWidth;
      event.currentTarget.classList.add(`trajectory${animation[animation.length - 1]}`);
    }

    function getBorders(DOMElement) {
      return {
        left: DOMElement.getBoundingClientRect().left,
        right: DOMElement.getBoundingClientRect().right,
      };
    }

    function isAppleAndBoardCollide() {
      const appleBorders = getBorders(event.target);
      const boardBorders = getBorders(board);
      return (
        (appleBorders.left < boardBorders.right && appleBorders.left > boardBorders.left) || (appleBorders.right > boardBorders.left && appleBorders.right < boardBorders.right)
      );
    }
  }

  return (
    <div className="PlayScreen">
      <div className="dresser"></div>
      <div className="stove"></div>
      <div className="appleContainer" id="appleContainer">
        {apples.map((apple) => {
          return <Apple onAnimationEnd={onAppleAnimationEnd} key={apple.key} dataKey={apple.key} color={apple.color} trajectory={apple.trajectory} />;
        })}
      </div>
      <Board getBoardInstance={getBoardInstance} />
    </div>
  );
}

/*
<img className="dresser" src={dresser} alt="dresser" />
<img className="stove" src={stove} alt="stove" />
*/

export default PlayScreen;
