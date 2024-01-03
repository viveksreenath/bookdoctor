import "./input.css";
const Input = (props) => {
  return (
    <input
      type={props.type}
      value={props.value}
      defaultValue="0"
      className="inputclass"
      onChange={props.onchange}
      onKeyDown={props.onKeyDown}
    />
  );
};
export default Input;
