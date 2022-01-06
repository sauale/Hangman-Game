const Notification = (props) => {
  return (
    <>
      {props.invalidKey ? (
        <h2 className="myelement" style={{ color: "red" }}>
          Invalid key
        </h2>
      ) : (
        <h2 className="myelement" style={{ color: "red" }}>
          Letter already entered
        </h2>
      )}
    </>
  );
};

export default Notification;
