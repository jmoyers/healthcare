import { InputTypes } from "./hooks/form";
import style from "./FormInput.module.scss";
import CheckboxGroup from "./CheckboxGroup";
import CheckboxOption from "./CheckboxOption";
import SelectSearch from "react-select-search";
import Datetime from "react-datetime";

import "react-select-search/style.css";
import "./react-selectsearch-custom.scss";
import "react-datetime/css/react-datetime.css";
import camelcase from "camelcase";

const toKey = (string) => {
  return camelcase(string).substring(0, 10);
};

const FormInput = (props) => {
  const { id, title, type, required, options, answer = "" } = props.section;
  const { onAnswerChange = () => {} } = props;

  const onOptionChange = (e) => {
    let newAnswer = new Set(answer);

    if (e.target.checked) {
      newAnswer.add(e.target.id);
    } else {
      newAnswer.delete(e.target.id);
    }

    onAnswerChange(props.section, Array.from(newAnswer));
  };

  const onChange = (e) => {
    if (e.target) {
      onAnswerChange(props.section, e.target.value);
    } else if (e.constructor.name === "String") {
      onAnswerChange(props.section, e);
    } else if (e.constructor.name === "Moment") {
      onAnswerChange(props.section, e.toDate().toString());
    }
  };

  // lets provide a default id if none is pr
  if (type === InputTypes.ShortAnswer) {
    return (
      <fieldset>
        <label htmlFor={id}>{title}</label>
        <input
          className={style.shortAnswer}
          id={id}
          value={answer}
          onChange={onChange}
        />
      </fieldset>
    );
  } else if (type === InputTypes.Paragraph) {
    return (
      <fieldset>
        <label htmlFor={id}>{title}</label>
        <textarea
          className={style.paragraph}
          id={id}
          value={answer}
          onChange={onChange}
        />
      </fieldset>
    );
  } else if (type === InputTypes.CheckboxGroup) {
    return (
      <CheckboxGroup title={title}>
        {options.map((option) => (
          <CheckboxOption
            label={option}
            key={toKey(option)}
            onChange={onOptionChange}
            checked={answer.includes(option)}
          />
        ))}
      </CheckboxGroup>
    );
  } else if (type === InputTypes.Dropdown) {
    const selectsearch_options = options.map((option) => ({
      name: option,
      value: toKey(option),
    }));

    return (
      <fieldset>
        <label htmlFor={id} className={style.dropdownLabel}>
          {title}
        </label>
        <SelectSearch
          options={selectsearch_options}
          name={id}
          value={toKey(answer)}
          onChange={onChange}
        />
      </fieldset>
    );
  } else if (type === InputTypes.DateTime) {
    return (
      <fieldset>
        <label htmlFor={id} className={style.datetimeLabel}>
          {title}
        </label>
        <Datetime onChange={onChange} value={new Date(answer)} />
      </fieldset>
    );
  }

  return null;
};

export default FormInput;
