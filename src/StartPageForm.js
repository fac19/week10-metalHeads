import React, {useState} from "react";
import "./StartPageForm.css";

const StartPageForm = (props) => {
    const [githubName, setGithubName] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        props.setGithubName(githubName);
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
                        setGithubName(e.target.value);
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
                        />
                    </div>
                    <div className="start-page-form__input-group__radio-buttons">
                        <label htmlFor="hardMode">Hard mode</label>
                        <input
                            id="hardMode"
                            type="radio"
                            name="difficulty"
                            value="hard"
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
