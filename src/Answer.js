import React, {useState, useEffect} from "react";
import "./Answer.css";

function Answer(props) {
    const [isAnswerCorrect, setIsAnswerCorrect] = useState("");

    // useEffect(() => {
    //     document.querySelector(".Answer").addEventListener("click", () => {
    //         handleAnswerClick();
    //     });
    //     // return (() => {

    //     // })
    // }, [isAnswerCorrect]);

    if (!props.thisAnswer) return null;

    const handleAnswerClick = (event) => {
        // document.querySelectorAll("button").forEach((button) => {
        //     console.log(button);
        //     button.disabled = true;
        // });

        // document.querySelectorAll(".Answer").forEach((answer) => {
        //     answer.removeEventListener("click", () => handleAnswerClick());
        // });

        if (props.thisAnswer.shortName === props.rightAnswer.shortName) {
            setIsAnswerCorrect("correct");
            props.setScore(props.score + 1);
        } else {
            setIsAnswerCorrect("wrong");
        }

        setTimeout(() => {
            setIsAnswerCorrect("");

            if (props.questionCount === props.totalQuestions) {
                props.setGameState("results");
            } else {
                props.setQuestionCount(props.questionCount + 1);
            }
        }, 3000);
    };

    return (
        <button className="Answer" onClick={handleAnswerClick}>
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
