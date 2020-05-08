import React, {useState, useEffect} from "react";
import "./Answer.css";

function Answer(props) {
    const [isAnswerCorrect, setIsAnswerCorrect] = useState("");

    useEffect(() => {
        setIsAnswerCorrect("");
    }, [props.thisAnswer]);

    if (!props.thisAnswer) return null;

    // const handleAnswerClick = (event) => {
    //     // disable pointer events so elemnt cannot be clicked again
    //     document.querySelectorAll("button").forEach((button) => {
    //         console.log(button);
    //         button.style.pointerEvents = "none";
    //     });

    //     if (props.thisAnswer.shortName === props.rightAnswer.shortName) {
    //         setIsAnswerCorrect("correct");
    //         props.setScore(props.score + 1);
    //     } else {
    //         setIsAnswerCorrect("wrong");
    //     }

    //     setTimeout(() => {
    //         setIsAnswerCorrect("");
    //         // re-enable pointer events so elemnt can be clicked again once component reloads
    //         document.querySelectorAll("button").forEach((button) => {
    //             console.log(button);
    //             button.style.pointerEvents = "auto";
    //         });
    //         if (props.questionCount === props.totalQuestions) {
    //             props.setGameState("results");
    //         } else {
    //             props.setQuestionCount(props.questionCount + 1);
    //         }
    //     }, 2000);
    // };

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
                src={require("./img/characters/" +
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
