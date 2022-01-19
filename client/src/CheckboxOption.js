import React from "react";
import style from "./CheckboxOption.module.scss";

const CheckboxOption = ({ label, optionName }) => {
  return (
    <fieldset className={style.fieldset}>
      <input
        type="checkbox"
        name={optionName}
        id={optionName}
        value={optionName}
        className={style.checkbox}
      />
      <label htmlFor={optionName}>{label}</label>
    </fieldset>
  );
};

export default CheckboxOption;
