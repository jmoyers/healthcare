import React, { useEffect, useLayoutEffect } from "react";
import style from "./FormEdit.module.scss";
import cx from "classnames";
import TabBar from "./TabBar";
import FormInputEdit from "./FormInputEdit";
import { useParams } from "react-router-dom";
import { nanoid } from "nanoid";

import { InputTypes, useForm, useFormUpdate } from "./hooks/form";

const FormEdit = () => {
  const { id } = useParams();
  const { status, data: form } = useForm(id);
  const { mutate } = useFormUpdate(id);

  useLayoutEffect(() => {
    let wasNew = false;

    if (status !== "success") return;

    for (const [i, section] of form.sections.entries()) {
      if (section.new) {
        wasNew = true;

        window.scrollTo({
          left: 0,
          top: document.body.scrollHeight,
          behavior: "smooth",
        });

        form.sections[i].new = false;
      }
    }

    if (wasNew) {
      mutate(form);
    }
  });

  useEffect(() => {
    let neededId = false;

    if (status === "success") {
      for (const [i, section] of form.sections.entries()) {
        if (!section.id) {
          section.id = nanoid();
          neededId = true;
        }
      }
    }

    if (neededId) {
      mutate(form);
    }
  }, [status, mutate, form]);

  const onChangeTitle = (e) => {
    mutate({
      ...form,
      title: e.target.value,
    });
  };

  const onChangeDesc = (e) => {
    mutate({
      ...form,
      description: e.target.value,
    });
  };

  const onClickAdd = () => {
    console.log("click add");

    const newForm = {
      ...form,
    };

    newForm.sections.push({
      id: nanoid(),
      title: "",
      type: InputTypes.ShortAnswer,
      required: false,
      new: true,
    });

    mutate(newForm);
  };

  const onClickDelete = (section) => {
    for (const [i, sec] of form.sections.entries()) {
      if (sec.id === section.id) {
        const secTmp = [...form.sections];

        secTmp.splice(i, 1);

        const newForm = {
          ...form,
          sections: secTmp,
        };

        mutate(newForm);
      }
    }
  };

  const onChangeSection = (section) => {
    for (const [i, sec] of form.sections.entries()) {
      if (sec.id === section.id) {
        form.sections[i] = section;
      }
    }

    mutate(form);
  };

  const tabBarActions = [
    {
      name: "Add Section",
      icon: "plus",
      onClick: onClickAdd,
    },
  ];

  return (
    <div className={cx("medscribe", style.container)}>
      <h1 className={style.title}>Edit Form</h1>
      <div className={style.formEditContainer}>
        {status === "success" && (
          <>
            <div className={style.section}>
              <h2 className={style.sectionTitle}>Title</h2>
              <input
                type="text"
                value={form.title}
                onChange={onChangeTitle}
              ></input>
            </div>

            <div className={style.section}>
              <h2 className={style.sectionTitle}>Description</h2>
              <input
                type="text"
                value={form.description}
                onChange={onChangeDesc}
              ></input>
            </div>

            {form.sections.map((section) => (
              <FormInputEdit
                section={section}
                key={section.id}
                onClickDelete={() => onClickDelete(section)}
                onChange={onChangeSection}
              />
            ))}
          </>
        )}
      </div>
      <TabBar actions={tabBarActions} />
    </div>
  );
};

export default FormEdit;
