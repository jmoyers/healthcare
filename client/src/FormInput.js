import { InputTypes } from "./hooks/form";
import style from "./FormInput.module.scss";
import CheckboxGroup from "./CheckboxGroup";
import CheckboxOption from "./CheckboxOption";
import Select from "react-select";
import Datetime from "react-datetime";

import "react-select-search/style.css";
import "./react-selectsearch-custom.scss";
import "react-datetime/css/react-datetime.css";
import camelcase from "camelcase";
import ShortAnswer from "./ShortAnswer";
import Paragraph from "./Paragraph";

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

  const onInputChange = (event) => {
    onAnswerChange(props.section, event.target.value);
  };

  const onSelectChange = (event) => {
    onAnswerChange(props.section, event);
  };

  const onDateChange = (value) => {
    onAnswerChange(props.section, value.toDate().toString());
  };

  return (
    <>
      {type === InputTypes.Header && (
        <div className={style.sectionHeader}>{title}</div>
      )}

      {type === InputTypes.ShortAnswer && (
        <ShortAnswer {...props.section} onChange={onInputChange} />
      )}

      {type === InputTypes.Paragraph && (
        <Paragraph {...props.section} onChange={onInputChange} />
      )}

      {type === InputTypes.CheckboxGroup && (
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
      )}

      {type === InputTypes.Dropdown && (
        <fieldset className={style.dropdown}>
          <label htmlFor={id} className={style.dropdownLabel}>
            {title}
          </label>
          <Select
            options={options.map((option) => ({
              label: option,
              value: option,
            }))}
            value={answer}
            onChange={onSelectChange}
          />
        </fieldset>
      )}

      {type === InputTypes.DateTime && (
        <fieldset className={style.datetime}>
          <label htmlFor={id} className={style.datetimeLabel}>
            {title}
          </label>
          <Datetime
            onChange={onDateChange}
            value={answer ? new Date(answer) : false}
          />
        </fieldset>
      )}

      {type === InputTypes.Date && (
        <fieldset className={style.datetime}>
          <label htmlFor={id} className={style.datetimeLabel}>
            {title}
          </label>
          <Datetime
            onChange={onDateChange}
            dateFormat="MM-DD-YYYY"
            timeFormat={false}
            value={answer ? new Date(answer) : false}
          />
        </fieldset>
      )}
    </>
  );
};

export default FormInput;
