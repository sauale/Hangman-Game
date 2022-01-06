const Popup = (props) => {
  return (
    <div className="popup-container">
      <div
        className="popup"
        style={
          props.status === "Won"
            ? { background: "#2eb929" }
            : { background: "#b92929" }
        }
      >
        <h2> Game has been {props.status}</h2>
        {props.status === "Lost" ? (
          <h2>Hidden word was {props.hiddenWord}</h2>
        ) : null}

        <button
          onClick={() => {
            window.location.reload();
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
