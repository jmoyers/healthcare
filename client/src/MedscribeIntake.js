import React from "react";
import style from "./MedscribeIntake.module.scss";
import cx from "classnames";

import FormInput from "./FormInput";

import { useForm } from "./hooks/form";
import { useParams } from "react-router-dom";

const MedscribeIntake = () => {
  const { id } = useParams();
  const { status, data: form, error } = useForm(id);

  return (
    <div className={cx("medscribe", style.container)}>
      {status === "success" && (
        <div className={style.intake}>
          <h1>{form.title}</h1>
          {form.sections.map((section) => (
            <FormInput section={section} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MedscribeIntake;
