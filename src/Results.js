import React from "react";
import "./Results.css";

const resultPics = {
    0: {zinger: "Shame!", pic: "Shame.jpg"},
    1: {zinger: "Pathetic.", pic: "Pathetic.jpg"},
    2: {zinger: "Looks like you choked!", pic: "Looks-like-you-choked.jpg"},
    3: {zinger: "Nice try but we hoped for more", pic: "We-hoped-for-more.jpg"},
    4: {zinger: "Pretty badass!", pic: "Pretty-badass.jpg"},
    5: {zinger: "King in the North!", pic: "King-in-the-north.jpg"}
};

function Results(props) {
    console.log("Results" + resultPics[props.score], props.score);
    return (
        <div className="Results">
            <div className="Results__topRow">
                <span className="Results__topRow__text">{props.score}</span>/
                <span className="Results__topRow__score">
                    {props.totalQuestions}
                </span>
            </div>
            <img
                className="Results__img"
                src={require("./img/results/" + resultPics[props.score].pic)}
                alt="Result visual representation"
            ></img>
            <p className="Results__zinger">{resultPics[props.score].zinger}</p>
            <button
                className="Results__button"
                onClick={() => props.setGameState("game")}
            >
                New game
            </button>
        </div>
    );
}

export default Results;
