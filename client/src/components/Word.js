import "../App.css";
import { useEffect, useState } from "react";
import Popup from "./Popup";

const Word = (props) => {
  const [updatedGameData, setUpdatedGameData] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [flag, setFlag] = useState(true);
  const [isKeyValid, setIsKeyValid] = useState(true);
  const handleKeyDown = (event) => {
    setIsKeyValid(true);
    if (event.keyCode >= 65 && event.keyCode <= 90) {
      console.log("key was pressed - ", event.key);

      setIsKeyValid(true);
      let status = updatedGameData ? updatedGameData.status : "";
      console.log("status:", status);
      console.log(updatedGameData);

      if (status === "") {
        fetch("/letter", {
          method: "POST",
          body: JSON.stringify({ key: event.key.toLowerCase(), id: props.id }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
          .then((response) => response.json())
          .then((json) => setUpdatedGameData(json));
      }
    } else {
      console.log("Invalid key");
      setIsKeyValid(false);
    }
  };

  if (updatedGameData && updatedGameData.status !== "" && flag) {
    setIsPlaying(false);
    setFlag(false);
  }
  if (updatedGameData && updatedGameData.showNotification) {
  }
  useEffect(() => {
    if (isPlaying) {
      window.addEventListener("keydown", handleKeyDown);
    }
    if (!isPlaying) {
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPlaying]);

  let items = [];
  console.log(updatedGameData);
  console.log(props.word);
  //   for (let i = 0; i < props.wordLength; i++) {
  //     items.push(<span className="letter">1</span>);
  //   }
  //   return <div className="word">{items}</div>;

  return (
    <div>
      {updatedGameData && updatedGameData.status === "" ? (
        <h3>
          Remaining tries{" "}
          {updatedGameData ? updatedGameData.remainingTries : 10}
        </h3>
      ) : null}

      <div className="word">
        {props.word &&
          props.word.split("").map((letter, i) => {
            return (
              <span className="letter" key={i}>
                {updatedGameData &&
                updatedGameData.correctLetters.includes(letter)
                  ? letter
                  : ""}
              </span>
            );
          })}
      </div>

      {updatedGameData && updatedGameData.status !== "" ? (
        <Popup
          status={updatedGameData.status}
          hiddenWord={updatedGameData.randomWord}
        />
      ) : null}

      <div className="wrong-letters">
        {updatedGameData && (
          <h3>wrong letters: {updatedGameData.wrongLetters.join(" ")}</h3>
        )}
      </div>
      <div>
        {updatedGameData && updatedGameData.showNotification ? (
          <h2 className="myelement" style={{ color: "red" }}>
            Letter already entered
          </h2>
        ) : null}
      </div>

      <div>
        {!isKeyValid ? (
          <h2 className="myelement" style={{ color: "red" }}>
            Invalid key
          </h2>
        ) : null}
      </div>
    </div>
  );
};

export default Word;
