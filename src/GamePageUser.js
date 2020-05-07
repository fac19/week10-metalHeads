import React from "react";
import "./GamePageUser.css";

function GamePageUser(props) {
    return (
        <div className="GamePageUser">
            <img
                className="GamePageUser__image"
                src={props.githubPicUrl}
                alt="Game user"
            />
            <span className="GamePageUser__username">
                {props.githubName}username
            </span>
        </div>
    );
}

export default GamePageUser;
