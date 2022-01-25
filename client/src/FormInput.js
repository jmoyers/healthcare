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

const FormInput = ({ section }) => {
  const { id, title, type, required, options } = section;

  console.log(section);

  // lets provide a default id if none is pr
  if (type === InputTypes.ShortAnswer) {
    return (
      <fieldset>
        <label htmlFor={id}>{title}</label>
        <input className={style.shortAnswer} id={id} />
      </fieldset>
    );
  } else if (type === InputTypes.Paragraph) {
    return (
      <fieldset>
        <label htmlFor={id}>{title}</label>
        <textarea className={style.paragraph} id={id} />
      </fieldset>
    );
  } else if (type === InputTypes.Checkbox) {
    return (
      <CheckboxGroup title={title}>
        {options.map((option) => (
          <CheckboxOption label={option} key={toKey(option)} />
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
        <SelectSearch options={selectsearch_options} name={id} />
      </fieldset>
    );
  } else if (type === InputTypes.DateTime) {
    return (
      <fieldset>
        <label htmlFor={id} className={style.datetimeLabel}>
          {title}
        </label>
        <Datetime />
      </fieldset>
    );
  }

  return null;
};

export default FormInput;
