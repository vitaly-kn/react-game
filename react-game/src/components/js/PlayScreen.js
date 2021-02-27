import dresser from "../../assets/img/dresser.svg";
import stove from "../../assets/img/stove.svg";
import "../css/PlayScreen.css";
import Apple from "./Apple";

function PlayScreen() {
  return (
    <div className="PlayScreen">
      <img className="dresser" src={dresser} alt="dresser" />
      <img className="stove" src={stove} alt="stove" />
      <div className="appleContainer" id="appleContainer">
        <Apple color="red" trajet="trajet1" />
        <Apple color="yellow" trajet="trajet2" />
        <Apple color="green" trajet="trajet3" />
      </div>
    </div>
  );
}

export default PlayScreen;
