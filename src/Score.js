import React from "react";
import "./Score.css";

function Score(props) {
    return (
        <div className="Score">
            <span>
                Score: {props.score}/{props.totalQuestions}
            </span>
        </div>
    );
}

export default Score;
