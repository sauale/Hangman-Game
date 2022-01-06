import "../App.css";
import { useEffect, useState } from "react";
import Popup from "./Popup";
import WrongLetters from "./WrongLetters";
import Notification from "./Notification";

const Word = (props) => {
  const [updatedGameData, setUpdatedGameData] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [flag, setFlag] = useState(true);
  const [isKeyValid, setIsKeyValid] = useState(true);
  const handleKeyDown = (event) => {
    setIsKeyValid(true);
    if (event.keyCode >= 65 && event.keyCode <= 90) {
      // console.log("key was pressed - ", event.key);

      setIsKeyValid(true);
      let status = updatedGameData ? updatedGameData.status : "";
      // console.log("status:", status);
      // console.log(updatedGameData);

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
      //  console.log("Invalid key");
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
          <WrongLetters WrongLetters={updatedGameData.wrongLetters} />
        )}
      </div>
      <div>
        {updatedGameData && updatedGameData.showNotification ? (
          <Notification invalidKey={false} />
        ) : null}
      </div>

      <div>{!isKeyValid ? <Notification invalidKey={true} /> : null}</div>
    </div>
  );
};

export default Word;
