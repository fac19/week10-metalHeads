import React, {useState, useEffect} from "react";
import {errIfNot200ish, decodeJSONOrDie, getRandomInt} from "../utils";
import "./GameBoard.css";
import Answer from "../Answer/Answer";

const characterList = [
    {shortName: "bran", longName: "Bradon Stark"},
    {shortName: "bronn", longName: "Bronn of the Blackwater"},
    {shortName: "brynden", longName: "Brynden Tully"},
    {shortName: "cersei", longName: "Cersei Lannister"},
    {shortName: "daenerys", longName: "Daenerys Targaryen"},
    {shortName: "davos", longName: "Davos Seaworth"},
    {shortName: "hound", longName: "The Hound"},
    {shortName: "jaime", longName: "Jaime Lannister"},
    {shortName: "jon", longName: "Jon Snow"},
    {shortName: "littlefinger", longName: "Littlefinger"},
    {shortName: "olenna", longName: "Olenna Tyrell"},
    {shortName: "renly", longName: "Renly Baratheon"},
    {shortName: "samwell", longName: "Samwell Tarly"},
    {shortName: "sansa", longName: "Sansa Stark"},
    {shortName: "tyrion", longName: "Tyrion Lannister"},
    {shortName: "varys", longName: "Lord Varys"}
];

function GameBoard(props) {
    const [question, setQuestion] = useState("");
    const [characters, setCharacters] = useState([...characterList]);
    const [rightAnswer, setRightAnswer] = useState("");
    const [answerList, setAnswerList] = useState([]);

    const handleAnswerClick = (answer) => {
        // disable pointer events so element cannot be clicked again
        document.querySelectorAll("button").forEach((button) => {
            console.log(button);
            button.style.pointerEvents = "none";
        });
        if (answer.shortName === rightAnswer.shortName) {
            props.setScore(props.score + 1);
        }
        setTimeout(() => {
            // re-enable pointer events so element can be clicked again once component reloads
            document.querySelectorAll("button").forEach((button) => {
                button.style.pointerEvents = "auto";
            });
            if (props.questionCount === props.totalQuestions) {
                props.setGameState("results");
            } else {
                props.setQuestionCount(props.questionCount + 1);
            }
        }, 2000); // Wait for 2 seconds before proceeding to next question
    };

    useEffect(() => {
        props.setGameState("game");

        // Remove a character at random from a copy of the characters array
        // to give us our right answer and an array we can use to avoid dupes
        const chars = [...characters];
        const idx = getRandomInt(chars.length - 1);
        const correctAnswer = chars.splice(idx, 1)[0];
        setCharacters(chars);
        setRightAnswer(correctAnswer);

        fetch(
            `https://got-quotes.herokuapp.com/quotes?char=${correctAnswer.shortName}`
        )
            .then(errIfNot200ish)
            .then(decodeJSONOrDie)
            .then(({quote, character}) => {
                setQuestion(quote);

                // Make a list of wrong answers then randomly insert
                // the right answer
                const tmpAnswerList = [];
                let wrongAnswers = characterList.filter(
                    (character) =>
                        character.shortName !== correctAnswer.shortName
                );
                for (let i = 0; i < props.difficulty; i++) {
                    let idx = getRandomInt(wrongAnswers.length - 1);
                    tmpAnswerList.push(wrongAnswers.splice(idx, 1)[0]);
                }
                tmpAnswerList[getRandomInt(props.difficulty)] = correctAnswer;

                setAnswerList(tmpAnswerList);
            })
            .catch((err) => {
                console.log("Problem getting quote", err);
            });
    }, [props.questionCount]);

    return (
        <div className="GameBoard">
            <div className="GameBoard__question">Who said it ?</div>
            <div className="GameBoard__quote">
                <q>
                    <em>{question}</em>
                </q>
            </div>
            <div className="GameBoard__answers">
                {answerList.map((answer, index) => (
                    <Answer
                        key={index}
                        thisAnswer={answer}
                        rightAnswer={rightAnswer}
                        handleAnswerClick={handleAnswerClick}
                    />
                ))}
            </div>
        </div>
    );
}

export default GameBoard;
