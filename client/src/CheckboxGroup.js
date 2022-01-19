import React from "react";
import style from "./CheckboxGroup.module.scss";

const CheckboxGroup = ({ title, children }) => {
  return (
    <section>
      <h2 className={style.title}>{title}</h2>
      <div className={style.group}>{children}</div>
    </section>
  );
};

export default CheckboxGroup;
