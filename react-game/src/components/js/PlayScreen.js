import dresser from "../../assets/img/dresser.svg";
import stove from "../../assets/img/stove.svg";
import "../css/PlayScreen.css";
import Apple from "./Apple";
import Board from "./Board";

function PlayScreen() {
  return (
    <div className="PlayScreen">
      <img className="dresser" src={dresser} alt="dresser" />
      <img className="stove" src={stove} alt="stove" />
      <div className="appleContainer" id="appleContainer">
        <Apple color="red" trajectory="trajectory1" />
        <Apple color="yellow" trajectory="trajectory2" />
        <Apple color="green" trajectory="trajectory3" />
      </div>
      <Board />
    </div>
  );
}

export default PlayScreen;
