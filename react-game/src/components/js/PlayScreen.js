import dresser from "../../assets/img/dresser.svg";
import stove from "../../assets/img/stove.svg";
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
  let boardCoords = { left: 0, right: 0 };

  function onNewBoardCoords(coords) {
    boardCoords = coords;
    //console.log(boardCoords);
  }

  function onCadence() {
    //console.log(`tick!`);
    const color = colors[getRandomInt(0, colors.length - 1)];
    const trajectory = trajectories[getRandomInt(0, trajectories.length - 1)];
    setNewApples([...apples, { color, trajectory, key: Date.now() }]);
    return;
  }

  cadencer.setCallback(onCadence);

  useEffect(() => cadencer.start());

  function onAppleAnimationEnd(event) {
    let animation = event.animationName;
    if (animation === animationWin) {
      props.incScore();
      const key = event.target.dataset.key;
      setNewApples(
        apples.filter((apple) => {
          return Number(apple.key) !== Number(key);
        })
      );
    } else if (animation.includes(animationsJumpTemplate)) {
      if (isAppleAndBoardCollide()) {
        restartVerticalAnimation();
      }
      /*
      console.log("boardCoords");
      console.log(boardCoords);
      console.log("apple coords");
      console.log(getAppleBorders());
      */
    }

    function restartVerticalAnimation() {
      event.currentTarget.classList.remove(`trajectory${animation[animation.length - 1]}`);
      void event.currentTarget.offsetWidth;
      event.currentTarget.classList.add(`trajectory${animation[animation.length - 1]}`);
    }

    function getAppleBorders() {
      return {
        left: event.target.getBoundingClientRect().left,
        right: event.target.getBoundingClientRect().right,
      };
    }

    function isAppleAndBoardCollide() {
      const appleBorders = getAppleBorders();
      return (appleBorders.left < boardCoords.right && appleBorders.left > boardCoords.left) || (appleBorders.right > boardCoords.left && appleBorders.right < boardCoords.right);
    }
  }

  return (
    <div className="PlayScreen">
      <img className="dresser" src={dresser} alt="dresser" />
      <img className="stove" src={stove} alt="stove" />
      <div className="appleContainer" id="appleContainer">
        {apples.map((apple) => {
          return <Apple onAnimationEnd={onAppleAnimationEnd} key={apple.key} dataKey={apple.key} color={apple.color} trajectory={apple.trajectory} />;
        })}
      </div>
      <Board onNewBoardCoords={onNewBoardCoords} />
    </div>
  );
}

export default PlayScreen;
