import React, { useEffect, useState } from "react";
import style from "./FormEdit.module.scss";
import cx from "classnames";
import Button from "./Button";
import FormInputEdit from "./FormInputEdit";
import { Form } from "./state/form";

const useFormState = (initial) => {
  const [state, setState] = useState(initial);
  const handleEvent = (e) => setState(e.target.value);
  return [state, handleEvent, setState];
};

const FormEdit = () => {
  const [title, onChangeTitle] = useFormState("A form title");
  const [description, onChangeDesc] = useFormState("A form description...");
  const [form, setForm] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("trigger");
    setForm(new Form());
    setLoading(false);
  }, []);

  const onClickAdd = () => {};

  const onClickDelete = (section) => {
    for (const [i, sec] of form.sections.entries()) {
      if (sec.id === section.id) {
        const secTmp = [...form.sections];

        secTmp.splice(i, 1);

        const newForm = {
          ...form,
          sections: secTmp,
        };

        setForm(newForm);
      }
    }
  };

  const onChangeSection = (section) => {
    for (const [i, sec] of form.sections.entries()) {
      if (sec.id === section.id) {
        form.sections[i] = section;
      }
    }

    setForm({ ...form });
  };

  return (
    <>
      <div className={cx("medscribe", style.container)}>
        <div className={style.formEditContainer}>
          <div className={style.formSection}>
            <h2>Title</h2>
            <input type="text" value={title} onChange={onChangeTitle}></input>
          </div>

          <div className={style.formSection}>
            <h2>Description</h2>
            <input
              type="text"
              value={description}
              onChange={onChangeDesc}
            ></input>
          </div>

          {!loading &&
            form.sections.map((section) => (
              <FormInputEdit
                section={section}
                key={section.id}
                onClickDelete={() => onClickDelete(section)}
                onChange={onChangeSection}
              />
            ))}
        </div>
      </div>
      <div className={style.controlsContainer}>
        <Button type="primary" icon="plus" onClick={onClickAdd}>
          Add Question
        </Button>
      </div>
    </>
  );
};

export default FormEdit;
