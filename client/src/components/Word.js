import "../App.css";
import { useEffect, useState } from "react";
const Word = (props) => {
  const [updatedGameData, setUpdatedGameData] = useState();
  const handleKeyDown = (event) => {
    if (event.keyCode >= 65 && event.keyCode <= 90) {
      console.log("key was pressed - ", event.key);

      fetch("/letter", {
        method: "POST",
        body: JSON.stringify({ key: event.key, id: props.id }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => setUpdatedGameData(json));
    } else {
      console.log("Invalid key");
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  let items = [];
  console.log(updatedGameData);
  console.log(props.word);
  //   for (let i = 0; i < props.wordLength; i++) {
  //     items.push(<span className="letter">1</span>);
  //   }
  //   return <div className="word">{items}</div>;

  return (
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
  );
};

export default Word;
