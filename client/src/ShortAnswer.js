import { useState } from "react";
import style from "./ShortAnswer.module.scss";

const ShortAnswer = (props) => {
  const { id, title, answer: initialAnswer, onChange = () => {} } = props;

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
      />
    </fieldset>
  );
};

export default ShortAnswer;
