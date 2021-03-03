import "../css/Apple.css";
import green from "../../assets/img/appleGreen.svg";
import red from "../../assets/img/appleRed.svg";
import yellow from "../../assets/img/appleYellow.svg";

const apples = {
  green,
  red,
  yellow,
};

function Apple(props) {
  return (
    <div className={`Apple ${props.trajectory}`} onAnimationEnd={props.onAnimationEnd} data-key={props.dataKey}>
      <img className="apple-image" src={apples[props.color]} alt="apple" />
    </div>
  );
}

export default Apple;
