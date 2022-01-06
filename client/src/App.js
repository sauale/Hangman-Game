import "./App.css";

import { useEffect, useState } from "react";
import Word from "./components/Word";

function App() {
  const [gameId, setGameId] = useState(null);
  const [gameData, setGameData] = useState([]);
  const [isGameStarted, setIsGameStarted] = useState(false);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setGameId(data.id));
  }, []);

  const buttonClickHandler = () => {
    fetch("/new-game", {
      method: "POST",
      body: JSON.stringify({ id: gameId }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => setGameData(json));

    setIsGameStarted(true);
  };

  return (
    <div className="App">
      <h1>Hangman Game</h1>

      <h3>Find hidden word</h3>
      <h3>Press a-z keys to guess</h3>
      {isGameStarted && (
        <Word
          word={gameData.randomWord}
          wordLength={gameData.randomWordLength}
          id={gameId}
        />
      )}
      {!isGameStarted && (
        <button className="myButton" onClick={buttonClickHandler}>
          New Game
        </button>
      )}
    </div>
  );
}

export default App;
