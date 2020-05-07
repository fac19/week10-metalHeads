import React from "react";
import "./Score.css";

function Score(props) {
    return (
        <div className="Score">
            <span>
                Question: {props.questionCount}/{props.totalQuestions}
                <br />
                Score: {props.score}
            </span>
        </div>
    );
}

export default Score;
