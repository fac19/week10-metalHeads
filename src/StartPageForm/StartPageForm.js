import React, {useState} from "react";
import "./StartPageForm.css";
import {errIfNot200ish, decodeJSONOrDie} from "../utils";

const StartPageForm = (props) => {
    const [isFormInputValid, setFormInputValid] = useState(false);
    const [formErrorMessage, setFormErrorMessage] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        fetch(`https://api.github.com/users/${props.githubName}`)
            .then(errIfNot200ish)
            .then(decodeJSONOrDie)
            .then((res) => {
                props.setGithubPicUrl(res.avatar_url);
                props.setGameState("game");
            })
            .catch((err) => {
                console.log("Problem getting profile pic, using default", err);
                setFormErrorMessage(
                    "Could't find github username, continue anyway?"
                );
                isFormInputValid && props.setGameState("game");
                setFormInputValid(true);
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
                        props.setGithubName(e.target.value);
                    }}
                    value={props.githubName}
                    required
                />

                <fieldset className="start-page-form__input-group">
                    <legend>Choose game mode:</legend>
                    <div className="start-page-form__input-group__radio-buttons">
                        <label htmlFor="easyMode">Easy</label>
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
                        <label htmlFor="hardMode">Hard</label>
                        <input
                            id="hardMode"
                            type="radio"
                            name="difficulty"
                            value="hard"
                            onChange={(e) => {
                                e.target.checked = true;
                                props.setDifficulty(6);
                            }}
                            checked={props.difficulty === 6}
                        />
                    </div>
                </fieldset>

                <label htmlFor="startButton">Press button to start</label>
                <div className="start-page-form__usernameErrorMessage">
                    {formErrorMessage}
                </div>
                <button id="startButton">START!</button>
            </form>
        </div>
    );
};
export default StartPageForm;
