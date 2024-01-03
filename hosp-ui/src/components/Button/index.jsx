import "./button.css";
const Button = (props) => {
  return (
    <button onClick={props.onClick} className="buttonclass">
      {props.text}
    </button>
  );
};
export default Button;
