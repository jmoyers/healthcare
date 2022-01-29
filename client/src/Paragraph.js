import { useState } from "react";
import style from "./ShortAnswer.module.scss";

const Paragraph = (props) => {
  let { id, value, title, answer: initialAnswer, onChange = () => {} } = props;

  if (value) {
    initialAnswer = value;
  }

  const [answer, setAnswer] = useState(initialAnswer);

  const onValueChange = (e) => {
    setAnswer(e.target.value);

    onChange(e);
  };

  return (
    <fieldset className={style.paragraph}>
      <label htmlFor={id}>{title}</label>
      <textarea
        className={style.paragraphInput}
        id={id}
        value={answer}
        onChange={onValueChange}
        onFocus={(e) => e.target.select()}
      />
    </fieldset>
  );
};

export default Paragraph;
