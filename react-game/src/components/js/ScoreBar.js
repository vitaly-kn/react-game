import "../css/ScoreBar.css";

function ScoreBar(props) {
  return (
    <div className="ScoreBar">
      <p>
        Your score :&nbsp;<span className="score-amount">{props.score}</span>
      </p>
      <p>
        Tries left :&nbsp;<span className="tries-amount">{props.tries}</span>
      </p>
    </div>
  );
}

export default ScoreBar;
