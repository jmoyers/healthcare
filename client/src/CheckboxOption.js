import React from "react";
import style from "./CheckboxOption.module.scss";

const CheckboxOption = (props) => {
  const { label, onChange = () => {}, checked } = props;

  return (
    <fieldset className={style.fieldset}>
      <label className={style.label} htmlFor={label}>
        {label}
      </label>
      <input
        type="checkbox"
        name={label}
        id={label}
        checked={checked}
        className={style.checkbox}
        onChange={onChange}
      />
    </fieldset>
  );
};

export default CheckboxOption;
