import React, {useState, useEffect} from "react";
import {errIfNot200ish, decodeJSONOrDie, getRandomInt} from "./utils";
import "./GameBoard.css";
import Answer from "./Answer";

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

    useEffect(() => {
        props.setGameState("game");

        const chars = [...characters];
        const idx = getRandomInt(chars.length - 1);
        const choice = chars.splice(idx, 1)[0];
        setCharacters(chars);
        setRightAnswer(choice);

        fetch(
            `https://got-quotes.herokuapp.com/quotes?char=${choice.shortName}`
        )
            .then(errIfNot200ish)
            .then(decodeJSONOrDie)
            .then(({quote, character}) => {
                // console.log("OUR ANSWER IS:", character);
                // console.log("OUR QUOTE IS:", quote);
                setQuestion(quote);

                const tmpAnswerList = [];
                // filter our correct answer from the characterList
                let wrongAnswers = characterList.filter(
                    (elem) => elem.shortName !== choice.shortName
                );
                // radnomly populate the arr with elements from characterList
                for (let i = 0; i < props.difficulty; i++) {
                    let idx = getRandomInt(wrongAnswers.length - 1);
                    tmpAnswerList.push(wrongAnswers.splice(idx, 1)[0]);
                }
                tmpAnswerList[getRandomInt(props.difficulty)] = choice;

                setAnswerList(tmpAnswerList);
            })
            .catch((err) => {
                console.log("Problem getting quote", err);
            });
    }, [props.questionCount]);

    // Create an array of answers where only one is the correct one
    // const answerList = [
    //     rightAnswer,
    //     {shortName: "bran", longName: "Bradon Stark"},
    //     {shortName: "cersei", longName: "Cersei Lannister"}
    // ];

    return (
        <div className="GameBoard">
            <div className="GameBoard__question">Who said it ?</div>
            <div className="GameBoard__quote">{question}</div>
            <div className="GameBoard__answers">
                {answerList.map((answer, index) => (
                    <Answer
                        key={index}
                        thisAnswer={answer}
                        rightAnswer={rightAnswer}
                        setScore={props.setScore}
                        score={props.score}
                        totalQuestions={props.totalQuestions}
                        // difficulty={props.difficulty}
                        setGameState={props.setGameState}
                        questionCount={props.questionCount}
                        setQuestionCount={props.setQuestionCount}
                    />
                ))}
            </div>
        </div>
    );
}

export default GameBoard;
