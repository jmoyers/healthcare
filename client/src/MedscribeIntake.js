import React from "react";
import style from "./MedscribeIntake.module.scss";
import cx from "classnames";

import { Form } from "./state/form";
import FormInput from "./FormInput";

const MedscribeIntake = () => {
  let form = new Form();

  return (
    <div className={cx("medscribe", style.container)}>
      <div className={style.intake}>
        <h1>{form.title}</h1>
        <form action="#" method="POST" className={style.medscribeForm}>
          {form.sections.map((section) => (
            <FormInput section={section} />
          ))}
        </form>
      </div>
    </div>
  );
};

export default MedscribeIntake;
