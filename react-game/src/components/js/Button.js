import "../css/Button.css";

function Button(props) {
  return (
    <button className="Button" id={props.id} onClick={props.onClick}>
      {props.caption}
    </button>
  );
}

export default Button;
