import React from "react";
import style from "./CheckboxOption.module.scss";
import camelcase from "camelcase";

const CheckboxOption = ({ label }) => {
  const id = camelcase(label).substring(0, 10);
  return (
    <fieldset className={style.fieldset}>
      <input
        type="checkbox"
        name={id}
        id={id}
        value={id}
        className={style.checkbox}
      />
      <label htmlFor={id}>{label}</label>
    </fieldset>
  );
};

export default CheckboxOption;
