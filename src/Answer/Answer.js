import React, {useState, useEffect} from "react";
import "./Answer.css";

function Answer(props) {
    const [isAnswerCorrect, setIsAnswerCorrect] = useState("");
    useEffect(() => {
        setIsAnswerCorrect("");
        return () => {
            setIsAnswerCorrect("");
        };
    }, [props.thisAnswer, props.rightAnswer]);

    if (!props.thisAnswer) return null;

    return (
        <button
            className="Answer"
            onClick={() => {
                const answer =
                    props.thisAnswer.shortName === props.rightAnswer.shortName
                        ? "correct"
                        : "wrong";
                setIsAnswerCorrect(answer);
                props.handleAnswerClick(props.thisAnswer);
            }}
        >
            <img
                className="Answer__img"
                src={require("../img/characters/" +
                    props.thisAnswer.shortName +
                    ".jpg")}
                alt="quiz answer button"
            ></img>
            <span className="Answer__characterName">
                {props.thisAnswer.longName}
            </span>
            <span className={"Answer__isAnswerRight " + isAnswerCorrect}>
                {isAnswerCorrect}
            </span>
        </button>
    );
}

export default Answer;
