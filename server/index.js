const express = require("express");
const { v4: uuidv4 } = require("uuid");
var cors = require("cors");
const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
//app.use(express.static(path.resolve(__dirname, "../client/build")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const WORDS = ["basketball", "football", "tennis", "skiing"];
const gameInfo = [];

app.get("/api", (req, res) => {
  const id = uuidv4();
  res.json({ id: id });
});

app.post("/new-game", (req, res) => {
  const id = req.body.id;
  const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
  console.log(id);
  console.log(randomWord);
  gameInfo.push({
    id: id,
    randomWord: randomWord,
    remainingTries: 10,
    correctLetters: [],
    wrongLetters: [],
    status: "",
  });
  console.log(gameInfo);
  res.send({
    randomWordLength: randomWord.length,
    randomWord: randomWord,
    remainingTries: 10,
    wrongLetters: [],
    id: id,
    status: "",
  });
});

app.post("/letter", (req, res) => {
  console.log(req.body.key, req.body.id);

  let word = gameInfo.find((x) => x.id === req.body.id);
  let index = gameInfo.findIndex((x) => x.id == req.body.id);

  if (word.correctLetters.includes(req.body.key)) {
    console.log("letter already used");
  } else if (word.randomWord.includes(req.body.key)) {
    word.correctLetters.push(req.body.key);
  } else {
    console.log("wrong letter");
    word.wrongLetters.push(req.body.key);
    word.remainingTries--;
  }

  word.status = "Won";
  word.randomWord.split("").forEach((letter) => {
    if (!word.correctLetters.includes(letter)) {
      word.status = "";
    }
  });

  if (word.remainingTries <= 0) {
    word.status = "Lost";
  }

  gameInfo[index] = word;

  console.log(word, index);
  res.send(gameInfo[index]);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
