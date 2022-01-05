const express = require("express");
const { v4: uuidv4 } = require("uuid");
var cors = require("cors");
const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
//app.use(express.static(path.resolve(__dirname, "../client/build")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const WORDS = ["Basketball", "Football", "Tennis", "Skiing"];
const gameInfo = [];

app.get("/api", (req, res) => {
  const id = uuidv4();
  res.json({ message: id });
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
  });
  console.log(gameInfo);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
