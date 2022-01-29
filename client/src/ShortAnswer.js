import { useState } from "react";
import style from "./ShortAnswer.module.scss";

const ShortAnswer = (props) => {
  let { id, title, value, answer: initialAnswer, onChange = () => {} } = props;

  if (value) {
    initialAnswer = value;
  }

  const [answer, setAnswer] = useState(initialAnswer);

  const onValueChange = (e) => {
    setAnswer(e.target.value);
    onChange(e);
  };

  return (
    <fieldset className={style.shortAnswer}>
      <label htmlFor={id}>{title}</label>
      <input
        className={style.shortAnswerInput}
        id={id}
        value={answer}
        onChange={onValueChange}
        onFocus={(e) => e.target.select()}
      />
    </fieldset>
  );
};

export default ShortAnswer;
