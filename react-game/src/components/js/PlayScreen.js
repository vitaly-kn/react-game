import dresser from "../../assets/img/dresser.svg";
import stove from "../../assets/img/stove.svg";
import "../css/PlayScreen.css";

function PlayScreen() {
  return (
    <div className="PlayScreen">
      <img className="dresser" src={dresser} alt="dresser" />
      <img className="stove" src={stove} alt="stove" />
    </div>
  );
}

export default PlayScreen;
