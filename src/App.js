import React, {useState} from "react";
import StartPageForm from "./StartPageForm";
import "./App.css";
// logo
import GameLogo from "./img/gameLogo";

function App() {
    const [githubName, setGithubName] = useState("");
    const [githubPicUrl, setGithubPicUrl] = useState("");
    const [gameState, setGameState] = useState("start");
    const [questionCount, setQuestionCount] = useState(0);
    const [totalQuestions, setTotalQuestions] = useState(5);
    const [difficulty, setDifficulty] = useState(4);
    const [score, setScore] = useState(0);

    return (
        <div className="App">
            <header className="App-header">
                <div className="logo">
                    <GameLogo color="white" />
                </div>

                {/* name component will go here */}
            </header>
            <div className="App_container">
                <aside className="App__game__container__left">torch</aside>

                <div className="App__gameContainer">
                    {gameState === "start" && (
                        <StartPageForm
                            githubName={githubName}
                            setGithubName={setGithubName}
                        />
                    )}
                </div>

                <aside className="App__game__container__right">torch</aside>
            </div>

            <footer className="App__footer"></footer>
        </div>
    );
}

export default App;

// state needed...
//         "githubname"
//         gameState: "start", "game", "results"
//         questionCount: 0
//         totalQuestions: 5
//         githubName:
//         github_pic_url:
//         difficulty: 4 | all
//         score: 0
