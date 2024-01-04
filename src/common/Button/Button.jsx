export const Custom_Button = ({ name, clickHandler, data }) => {
  return (
    <>
      <button onClick={() => clickHandler(data)}>{name}</button>
    </>
  );
};
