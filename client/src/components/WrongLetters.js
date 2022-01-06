import "../App.css";
const WrongLetters = (props) => {
  return (
    <div className="wrong-letters">
      <h3>wrong letters: {props.WrongLetters.join(" ")}</h3>
    </div>
  );
};
export default WrongLetters;
