import React from "react";
import style from "./CheckboxOption.module.scss";
import cx from "classnames";
import camelcase from "camelcase";

const CheckboxOption = (props) => {
  const { label, onChange = () => {}, checked } = props;
  const id = camelcase(label).substring(0, 10);

  return (
    <fieldset className={style.fieldset}>
      <label className={style.label} htmlFor={id}>
        {label}
      </label>
      <input
        type="checkbox"
        name={id}
        id={id}
        checked={checked}
        className={style.checkbox}
        onChange={onChange}
      />
    </fieldset>
  );
};

export default CheckboxOption;
