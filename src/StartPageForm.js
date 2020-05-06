import React from "react";

const StartPageForm = (props) => {
  return (
    <div className="start-page-form">
      <form>
        <label htmlFor="githubName">Enter your github username</label>
        <input
          type="text"
          id="githubName"
          name="githubName"
          placeholder="Enter you github username"
        />

        <label htmlFor="easyMode">Easy mode</label>
        <input id="easyMode" type="radio" name="difficulty" value="easy" />
        <label htmlFor="hardMode">Hard mode</label>
        <input id="hardMode" type="radio" name="difficulty" value="hard" />

        <label htmlFor="startButton">Press button to start</label>
        <button id="startButton">START!</button>
      </form>
    </div>
  );
};
export default StartPageForm;
