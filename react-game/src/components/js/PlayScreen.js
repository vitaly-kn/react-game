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

function PlayScreen(props) {
  //console.log("PlayScreen!");

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  let [apples, setNewApples] = useState([]);

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
    if (event.animationName === animationWin) {
      props.incScore();
      const key = event.target.dataset.key;
      setNewApples(
        apples.filter((apple) => {
          return Number(apple.key) !== Number(key);
        })
      );
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
      <Board />
    </div>
  );
}

export default PlayScreen;
