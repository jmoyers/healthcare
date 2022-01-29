import React from "react";
import style from "./ViewResponse.module.scss";
import cx from "classnames";

import FormInput from "./FormInput";
import TabBar from "./TabBar";

import { useForm } from "./hooks/form";
import { useNavigate, useParams } from "react-router-dom";

const PreviewForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { status, data: form } = useForm(id);

  return (
    <div className={cx("medscribe", style.container)}>
      {status === "success" && (
        <div className={style.intake}>
          <div className={style.titleContainer}>
            <h1 className={style.title}>Preview: {form.title}</h1>
          </div>
          <div className={style.descriptionContainer}>
            <div className={style.description}>{form.description}</div>
          </div>
          <div className={style.sectionsContainer}>
            {form.sections.map((section) => (
              <FormInput section={section} key={section.id} />
            ))}
          </div>
        </div>
      )}
      <TabBar
        actions={[
          {
            name: "Edit Form",
            onClick: () => navigate(`/form/${id}/edit`),
            icon: "cog",
          },
          {
            name: "Done",
            onClick: () => navigate(`/forms`),
            icon: "check",
            type: "secondary",
          },
        ]}
      ></TabBar>
    </div>
  );
};

export default PreviewForm;
