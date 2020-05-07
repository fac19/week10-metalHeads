import React, {useState} from "react";
import StartPageForm from "./StartPageForm";
import GamePageUser from "./GamePageUser";
import Score from "./Score";
import GameBoard from "./GameBoard";
import Results from "./Results";
import "./App.css";
// logo
import GameLogo from "./img/gameLogo";
import TorchImage from "./img/TorchImage";

function App() {
    const [githubName, setGithubName] = useState("");
    const [githubPicUrl, setGithubPicUrl] = useState(
        "https://i0.wp.com/www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg"
    );
    const [gameState, setGameState] = useState("start");
    const [questionCount, setQuestionCount] = useState(1);
    const [totalQuestions] = useState(5);
    const [difficulty, setDifficulty] = useState(3);
    const [score, setScore] = useState(0);

    return (
        <div className="App">
            <header className="App-header">
                <div className="logo">
                    <GameLogo color="white" />
                </div>
            </header>
            <div className="App_container">
                <aside className="App__game__container__left">
                    <TorchImage color="white" />
                </aside>

                <div className="App__gameContainer">
                    {gameState === "start" && (
                        <StartPageForm
                            githubName={githubName}
                            setGithubName={setGithubName}
                            difficulty={difficulty}
                            setDifficulty={setDifficulty}
                            setGameState={setGameState}
                            setGithubPicUrl={setGithubPicUrl}
                        />
                    )}
                    {gameState === "game" && (
                        <GameBoard
                            setQuestionCount={setQuestionCount}
                            questionCount={questionCount}
                            totalQuestions={totalQuestions}
                            setScore={setScore}
                            difficulty={difficulty}
                            setGameState={setGameState}
                            score={score}
                        />
                    )}
                    {gameState === "results" && (
                        <Results
                            score={score}
                            totalQuestions={totalQuestions}
                            setGameState={setGameState}
                            setQuestionCount={setQuestionCount}
                        />
                    )}
                </div>

                <aside className="App__game__container__right">
                    {" "}
                    <TorchImage color="white" />
                </aside>
            </div>

            <footer className="App__footer">
                <div className="level">
                    Difficulty : {difficulty === 3 ? " Easy" : " Hard"}
                </div>
                <div className="score">
                    {gameState === "game" && (
                        <Score
                            score={score}
                            questionCount={questionCount}
                            totalQuestions={totalQuestions}
                        />
                    )}
                </div>
                <div className="username">
                    {gameState === "game" && (
                        <GamePageUser
                            githubName={githubName}
                            githubPicUrl={githubPicUrl}
                        />
                    )}
                </div>
            </footer>
        </div>
    );
}

export default App;
