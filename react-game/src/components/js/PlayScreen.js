import "../css/PlayScreen.css";
import Cadencer from "./Cadencer";
import Apple from "./Apple";
import Board from "./Board";
import { useEffect, useState, useContext } from "react";
import { GameContext } from "./contexts";
import useSound from "use-sound";
import bonusSfxFile from "../../assets/sound/bonus.wav";
import failSfxFile from "../../assets/sound/fail.wav";
import kickSfxFile from "../../assets/sound/kick.wav";
import respawnSfxFile from "../../assets/sound/respawn.wav";

let cadencer = new Cadencer();
const colors = ["red", "yellow", "green"];
const trajectories = ["trajectory1", "trajectory2", "trajectory3"];
const animationWin = "left-right-frames";
const animationsJumpTemplate = "up-down-frames";

function PlayScreen(props) {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  let [apples, setNewApples] = useState([]);
  let [board, setBoard] = useState(null);
  let { pause } = useContext(GameContext);
  let { active } = useContext(GameContext);
  let { restart, setRestart } = useContext(GameContext);
  let { cadence } = useContext(GameContext);
  let { soundEnabled } = useContext(GameContext);
  const [bonusSfx] = useSound(bonusSfxFile);
  const [failSfx] = useSound(failSfxFile);
  const [kickSfx] = useSound(kickSfxFile);
  const [respawnSfx] = useSound(respawnSfxFile);

  function playSound(sound) {
    if (soundEnabled === "true") {
      sound();
    }
  }

  function getBoardInstance(DOMElement) {
    setBoard(DOMElement);
  }

  function addNewApple() {
    const color = colors[getRandomInt(0, colors.length - 1)];
    const trajectory = trajectories[getRandomInt(0, trajectories.length - 1)];
    setNewApples([...apples, { color, trajectory, key: Date.now() }]);
    playSound(respawnSfx);
  }

  cadencer.setCallback(addNewApple);

  useEffect(() => {
    if (active) {
      if (!pause) {
        document.getElementById("appleContainer").classList.remove("freeze");
        cadencer.start();
      } else {
        document.getElementById("appleContainer").classList.add("freeze");
        cadencer.stop();
      }
    } else {
      document.getElementById("appleContainer").classList.add("freeze");
      cadencer.stop();
    }
  }, [active, pause]);

  useEffect(() => {
    cadencer.setCadence(cadence);
  }, [cadence]);

  useEffect(
    () => {
      if (restart) {
        setNewApples([]);
        setRestart(false);
      }
    },
    // eslint-disable-next-line
    [restart]
  );

  function onAppleAnimationEnd(event) {
    const animation = event.animationName;
    if (animation === animationWin) {
      props.incScore();
      playSound(bonusSfx);
      removeApple();
    } else if (animation.includes(animationsJumpTemplate)) {
      if (isAppleAndBoardCollide()) {
        restartVerticalAnimation();
        playSound(kickSfx);
      } else {
        event.currentTarget.classList.add("fall");
      }
    } else {
      props.decTries();
      playSound(failSfx);
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

export default PlayScreen;
