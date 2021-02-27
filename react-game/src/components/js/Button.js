import "../css/Button.css";

function Button(props) {
  return (
    <button className="Button" id={props.id}>
      {props.caption}
    </button>
  );
}

export default Button;
