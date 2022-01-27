import React from "react";
import style from "./CheckboxGroup.module.scss";

const CheckboxGroup = ({ title, children }) => {
  return (
    <section>
      <div className={style.title}>{title}</div>
      <div className={style.group}>{children}</div>
    </section>
  );
};

export default CheckboxGroup;
