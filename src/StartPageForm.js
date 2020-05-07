import React, {useState} from "react";
import "./StartPageForm.css";
import {errIfNot200ish, decodeJSONOrDie} from "./utils";

const StartPageForm = (props) => {
    // const [githubName, setGithubName] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        console.log("Submitting");
        fetch(`https://api.github.com/users/${props.githubName}`)
            .then(errIfNot200ish)
            .then(decodeJSONOrDie)
            .then((res) => {
                console.log("RES:", res);
                props.setGithubPicUrl(res.avatar_url);
                props.setGameState("game");
            })
            .catch((err) => {
                console.log("Problem getting profile pic, using default", err);
                props.setGameState("game");
            });
    }

    return (
        <div className="start-page-form">
            <form onSubmit={handleSubmit}>
                <label htmlFor="githubName">Enter your github username</label>
                <input
                    type="text"
                    id="githubName"
                    name="githubName"
                    placeholder="Enter you github username"
                    onChange={(e) => {
                        console.log(e.target.value);
                        props.setGithubName(e.target.value);
                    }}
                />
                <div className="start-page-form__input-group">
                    <div className="start-page-form__input-group__radio-buttons">
                        <label htmlFor="easyMode">Easy mode</label>
                        <input
                            id="easyMode"
                            type="radio"
                            name="difficulty"
                            value="easy"
                            onChange={(e) => props.setDifficulty(3)}
                            checked={props.difficulty === 3}
                        />
                    </div>
                    <div className="start-page-form__input-group__radio-buttons">
                        <label htmlFor="hardMode">Hard mode</label>
                        <input
                            id="hardMode"
                            type="radio"
                            name="difficulty"
                            value="hard"
                            onChange={(e) => props.setDifficulty(6)}
                            checked={props.difficulty === 6}
                        />
                    </div>
                </div>
                <label htmlFor="startButton">Press button to start</label>
                <button id="startButton">START!</button>
            </form>
        </div>
    );
};
export default StartPageForm;
